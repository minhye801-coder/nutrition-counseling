import {
  callNeisAllPages,
  jsonResponse,
  errorResponse,
  getKstDateString,
  formatDateDisplay,
  addDaysToYmd,
  splitBr,
  cleanDishName,
  NeisError,
} from '../_lib/neis.js';

const SEARCH_FORWARD_DAYS = 14;
const CACHE_SECONDS = 60 * 60;

function pickPreferredMeal(rows) {
  if (!rows || !rows.length) return null;
  const lunch = rows.find((r) => r.MMEAL_SC_CODE === '2');
  return lunch || rows[0];
}

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  const officeCode = (url.searchParams.get('officeCode') || '').trim();
  const schoolCode = (url.searchParams.get('schoolCode') || '').trim();
  const schoolName = (url.searchParams.get('schoolName') || '').trim();
  let date = (url.searchParams.get('date') || '').trim();

  if (!officeCode || !schoolCode) {
    return errorResponse('학교 정보가 올바르지 않습니다. 학교를 다시 선택해 주세요.', 400);
  }

  if (!/^\d{8}$/.test(date)) {
    date = getKstDateString(0);
  }

  if (!env.NEIS_API_KEY) {
    return errorResponse('서버에 NEIS_API_KEY가 등록되어 있지 않습니다. 관리자에게 문의해 주세요.', 500);
  }

  const cache = caches.default;
  const cacheUrl = new URL(request.url);
  // Include the deployed commit so a new deploy naturally invalidates any
  // edge-cached responses from before a bug fix, instead of waiting out
  // CACHE_SECONDS across every Cloudflare edge location.
  cacheUrl.search = new URLSearchParams({
    officeCode,
    schoolCode,
    date,
    v: env.CF_PAGES_COMMIT_SHA || 'dev',
  }).toString();
  const cacheKey = new Request(cacheUrl.toString(), { method: 'GET' });

  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  try {
    // NEIS doesn't reliably filter by MLSV_FROMYMD/MLSV_TOYMD for this endpoint, so
    // fetch the school's full paginated history and filter for the target date ourselves.
    const rows = await callNeisAllPages(env.NEIS_API_KEY, 'mealServiceDietInfo', {
      ATPT_OFCDC_SC_CODE: officeCode,
      SD_SCHUL_CODE: schoolCode,
      MLSV_FROMYMD: date,
      MLSV_TOYMD: addDaysToYmd(date, SEARCH_FORWARD_DAYS),
    });

    const byDate = new Map();
    for (const row of rows) {
      const list = byDate.get(row.MLSV_YMD) || [];
      list.push(row);
      byDate.set(row.MLSV_YMD, list);
    }

    const todayMeal = pickPreferredMeal(byDate.get(date));
    const nextDates = [...byDate.keys()].filter((d) => d > date).sort();
    const nextMealDate = nextDates.length ? nextDates[0] : null;

    const data = {
      date: formatDateDisplay(date),
      schoolName,
      hasMeal: Boolean(todayMeal),
      mealType: todayMeal ? todayMeal.MMEAL_SC_NM : null,
      menu: todayMeal ? splitBr(todayMeal.DDISH_NM).map(cleanDishName) : [],
      calorie: todayMeal ? todayMeal.CAL_INFO || '' : '',
      nutrition: todayMeal ? splitBr(todayMeal.NTR_INFO) : [],
      origin: todayMeal ? splitBr(todayMeal.ORPLC_INFO) : [],
      nextMealDate: nextMealDate ? formatDateDisplay(nextMealDate) : null,
      message: todayMeal ? '' : '오늘 등록된 급식이 없습니다.',
    };

    const response = jsonResponse({ ok: true, data });
    response.headers.set('Cache-Control', `public, max-age=${CACHE_SECONDS}`);
    context.waitUntil(cache.put(cacheKey, response.clone()));
    return response;
  } catch (err) {
    const message =
      err instanceof NeisError ? err.message : '급식 정보를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.';
    return errorResponse(message, 502);
  }
}
