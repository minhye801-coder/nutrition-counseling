const CONFIG = {
  SYSTEM_NAME: "맛마음 탐험소 Lite",
  VERSION: "2.0.0",
  TIME_ZONE: "Asia/Seoul",
  SCHOOL_SEARCH_LIMIT: 40,
  NEXT_MEAL_SEARCH_DAYS: 14,
  SCHOOL_CACHE_SECONDS: 21600,
  MEAL_CACHE_SECONDS: 21600,
};

const JSON_HEADERS = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
  "x-content-type-options": "nosniff",
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    try {
      if (url.pathname === "/api/config") {
        return jsonResponse({
          ok: true,
          data: {
            systemName: CONFIG.SYSTEM_NAME,
            version: CONFIG.VERSION,
            today: getKoreanDateKey(),
            apiKeyRegistered: Boolean(clean(env.NEIS_API_KEY)),
            privacyNotice:
              "학생 이름과 상담정보를 수집하지 않으며, 체험 기록은 현재 브라우저에만 저장됩니다.",
          },
        });
      }

      if (url.pathname === "/api/schools") {
        if (request.method !== "GET") {
          return methodNotAllowed();
        }

        const rows = await searchSchools(url, env);

        return jsonResponse({
          ok: true,
          data: rows,
        });
      }

      if (url.pathname === "/api/meals") {
        if (request.method !== "GET") {
          return methodNotAllowed();
        }

        const result = await getSchoolMeals(url, env);

        return jsonResponse({
          ok: true,
          data: result,
        });
      }

      if (url.pathname.startsWith("/api/")) {
        return jsonResponse(
          {
            ok: false,
            error: "존재하지 않는 API 주소입니다.",
          },
          404,
        );
      }

      return env.ASSETS.fetch(request);
    } catch (error) {
      console.error(error);

      return jsonResponse(
        {
          ok: false,
          error:
            error instanceof Error
              ? error.message
              : "서버 처리 중 오류가 발생했습니다.",
        },
        500,
      );
    }
  },
};

async function searchSchools(url, env) {
  const query = clean(url.searchParams.get("query"));
  const officeCode = clean(url.searchParams.get("officeCode"));
  const schoolKind = clean(url.searchParams.get("schoolKind"));

  if (query.length < 2) {
    throw new Error("학교 이름을 2글자 이상 입력하세요.");
  }

  const params = {
    Type: "json",
    pIndex: "1",
    pSize: String(CONFIG.SCHOOL_SEARCH_LIMIT),
    SCHUL_NM: query,
  };

  if (officeCode) {
    params.ATPT_OFCDC_SC_CODE = officeCode;
  }

  if (schoolKind) {
    params.SCHUL_KND_SC_NM = schoolKind;
  }

  const rows = await fetchNeisRows(
    "schoolInfo",
    params,
    env,
    CONFIG.SCHOOL_CACHE_SECONDS,
  );

  return rows
    .map((row) => ({
      officeCode: clean(row.ATPT_OFCDC_SC_CODE),
      officeName: clean(row.ATPT_OFCDC_SC_NM),
      schoolCode: clean(row.SD_SCHUL_CODE),
      schoolName: clean(row.SCHUL_NM),
      schoolKind: clean(row.SCHUL_KND_SC_NM),
      address: clean(row.ORG_RDNMA || row.ORG_RDNZC),
    }))
    .filter(
      (row) =>
        row.officeCode &&
        row.schoolCode &&
        row.schoolName,
    )
    .slice(0, CONFIG.SCHOOL_SEARCH_LIMIT);
}

async function getSchoolMeals(url, env) {
  const officeCode = clean(url.searchParams.get("officeCode"));
  const schoolCode = clean(url.searchParams.get("schoolCode"));
  const schoolName = clean(url.searchParams.get("schoolName"));
  const requestedDate = clean(url.searchParams.get("date"));

  if (!officeCode || !schoolCode) {
    throw new Error("학교를 먼저 선택하세요.");
  }

  const baseDate = parseDateKey(requestedDate) || getKoreanTodayDate();
  const todayRows = await fetchMealRows(
    officeCode,
    schoolCode,
    baseDate,
    env,
  );

  const today = chooseLunch(
    todayRows.map(normalizeMeal).filter(Boolean),
  );

  let next = null;

  for (
    let offset = 1;
    offset <= CONFIG.NEXT_MEAL_SEARCH_DAYS;
    offset += 1
  ) {
    const candidate = addDays(baseDate, offset);

    const rows = await fetchMealRows(
      officeCode,
      schoolCode,
      candidate,
      env,
    );

    next = chooseLunch(
      rows.map(normalizeMeal).filter(Boolean),
    );

    if (next) {
      break;
    }
  }

  return {
    ok: true,
    school: {
      officeCode,
      schoolCode,
      schoolName,
    },
    baseDate: formatDateKey(baseDate),
    today,
    next,
    nextLabel:
      next && isNextDay(baseDate, next.dateKey)
        ? "내일 급식"
        : "다음 급식일",
    source: "NEIS mealServiceDietInfo",
  };
}

async function fetchMealRows(
  officeCode,
  schoolCode,
  date,
  env,
) {
  return fetchNeisRows(
    "mealServiceDietInfo",
    {
      Type: "json",
      pIndex: "1",
      pSize: "10",
      ATPT_OFCDC_SC_CODE: officeCode,
      SD_SCHUL_CODE: schoolCode,
      MLSV_YMD: formatCompactDate(date),
    },
    env,
    CONFIG.MEAL_CACHE_SECONDS,
  );
}

async function fetchNeisRows(
  endpoint,
  params,
  env,
  cacheSeconds,
) {
  const apiKey = clean(env.NEIS_API_KEY);

  if (!apiKey) {
    throw new Error(
      "NEIS_API_KEY가 등록되지 않았습니다. Cloudflare Worker의 Settings → Variables and Secrets에서 Secret으로 등록하세요.",
    );
  }

  const upstreamUrl = new URL(
    `https://open.neis.go.kr/hub/${endpoint}`,
  );

  upstreamUrl.searchParams.set("KEY", apiKey);

  for (const [key, value] of Object.entries(params)) {
    if (value !== "" && value !== null && value !== undefined) {
      upstreamUrl.searchParams.set(key, String(value));
    }
  }

  /*
   * 인증키가 들어간 실제 URL을 캐시 키로 사용하지 않기 위해
   * 키를 제외한 별도 내부 캐시 URL을 만듭니다.
   */
  const safeCacheUrl = new URL(
    `https://taste-mind-cache.internal/${endpoint}`,
  );

  for (const [key, value] of Object.entries(params)) {
    if (value !== "" && value !== null && value !== undefined) {
      safeCacheUrl.searchParams.set(key, String(value));
    }
  }

  const cache = caches.default;
  const cacheRequest = new Request(safeCacheUrl.toString(), {
    method: "GET",
  });

  const cached = await cache.match(cacheRequest);

  if (cached) {
    return cached.json();
  }

  const response = await fetch(upstreamUrl.toString(), {
    method: "GET",
    headers: {
      Accept: "application/json,text/plain,*/*",
      "Accept-Language": "ko-KR,ko;q=0.9",
      "User-Agent": "TasteMindLite/2.0",
    },
  });

  if (!response.ok) {
    const text = await response.text();

    throw new Error(
      `나이스 조회에 실패했습니다. HTTP ${response.status}: ${text.slice(0, 200)}`,
    );
  }

  let json;

  try {
    json = await response.json();
  } catch {
    throw new Error(
      "나이스 응답을 JSON으로 읽지 못했습니다.",
    );
  }

  const rows = parseNeisRows(endpoint, json);

  const cacheResponse = new Response(JSON.stringify(rows), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": `public, max-age=${cacheSeconds}`,
    },
  });

  await cache.put(cacheRequest, cacheResponse);

  return rows;
}

function parseNeisRows(endpoint, json) {
  if (json.RESULT) {
    const resultCode = clean(json.RESULT.CODE);

    if (resultCode === "INFO-200") {
      return [];
    }

    throw new Error(
      clean(json.RESULT.MESSAGE || json.RESULT.CODE) ||
        "나이스 조회 오류",
    );
  }

  const blocks = json[endpoint] || [];
  const rowBlock = blocks.find((block) =>
    Array.isArray(block.row),
  );

  return rowBlock ? rowBlock.row : [];
}

function normalizeMeal(row) {
  if (!row) {
    return null;
  }

  const compactDate = clean(row.MLSV_YMD);

  if (!/^\d{8}$/.test(compactDate)) {
    return null;
  }

  const dateKey =
    `${compactDate.slice(0, 4)}-` +
    `${compactDate.slice(4, 6)}-` +
    compactDate.slice(6, 8);

  return {
    dateKey,
    dateLabel: formatKoreanDate(dateKey),
    mealName: clean(row.MMEAL_SC_NM),
    menu: parseMenu(row.DDISH_NM),
    calories: clean(row.CAL_INFO),
    nutrition: clean(row.NTR_INFO),
    origin: clean(row.ORPLC_INFO),
  };
}

function chooseLunch(meals) {
  if (!meals.length) {
    return null;
  }

  return (
    meals.find((meal) =>
      /중식|점심/.test(meal.mealName),
    ) || meals[0]
  );
}

function parseMenu(value) {
  return String(value || "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .split(/\n+/)
    .map((item) =>
      item
        .replace(/\s*\d+(\.\d+)*\.?\s*/g, "")
        .trim(),
    )
    .filter(Boolean);
}

function getKoreanDateKey() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: CONFIG.TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function getKoreanTodayDate() {
  return parseDateKey(getKoreanDateKey());
}

function parseDateKey(value) {
  const match = String(value || "").match(
    /^(\d{4})-(\d{2})-(\d{2})$/,
  );

  if (!match) {
    return null;
  }

  const date = new Date(
    Date.UTC(
      Number(match[1]),
      Number(match[2]) - 1,
      Number(match[3]),
      12,
      0,
      0,
    ),
  );

  return Number.isNaN(date.getTime()) ? null : date;
}

function addDays(date, days) {
  const next = new Date(date.getTime());
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

function formatDateKey(date) {
  return [
    date.getUTCFullYear(),
    String(date.getUTCMonth() + 1).padStart(2, "0"),
    String(date.getUTCDate()).padStart(2, "0"),
  ].join("-");
}

function formatCompactDate(date) {
  return formatDateKey(date).replace(/-/g, "");
}

function formatKoreanDate(dateKey) {
  const date = parseDateKey(dateKey);

  if (!date) {
    return dateKey;
  }

  return new Intl.DateTimeFormat("ko-KR", {
    timeZone: CONFIG.TIME_ZONE,
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(date);
}

function isNextDay(baseDate, dateKey) {
  return formatDateKey(addDays(baseDate, 1)) === dateKey;
}

function jsonResponse(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: JSON_HEADERS,
  });
}

function methodNotAllowed() {
  return jsonResponse(
    {
      ok: false,
      error: "허용되지 않은 요청 방식입니다.",
    },
    405,
  );
}

function clean(value) {
  return value === null || value === undefined
    ? ""
    : String(value).trim();
}
