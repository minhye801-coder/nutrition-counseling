import { callNeis, jsonResponse, errorResponse, NeisError } from '../_lib/neis.js';

const MAX_RESULTS = 40;
const CACHE_SECONDS = 6 * 60 * 60;

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  const query = (url.searchParams.get('query') || '').trim();
  const officeCode = (url.searchParams.get('officeCode') || '').trim();
  const schoolKind = (url.searchParams.get('schoolKind') || '').trim();

  if (query.length < 2) {
    return errorResponse('학교 이름을 2글자 이상 입력해 주세요.', 400);
  }

  if (!env.NEIS_API_KEY) {
    return errorResponse('서버에 NEIS_API_KEY가 등록되어 있지 않습니다. 관리자에게 문의해 주세요.', 500);
  }

  const cache = caches.default;
  const cacheUrl = new URL(request.url);
  cacheUrl.search = new URLSearchParams({
    query,
    officeCode,
    schoolKind,
    v: env.CF_PAGES_COMMIT_SHA || 'dev',
  }).toString();
  const cacheKey = new Request(cacheUrl.toString(), { method: 'GET' });

  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  try {
    const rows = await callNeis(env.NEIS_API_KEY, 'schoolInfo', {
      SCHUL_NM: query,
      ATPT_OFCDC_SC_CODE: officeCode || undefined,
      SCHUL_KND_SC_NM: schoolKind || undefined,
      pSize: 100,
    });

    const schools = rows.slice(0, MAX_RESULTS).map((row) => ({
      officeCode: row.ATPT_OFCDC_SC_CODE,
      officeName: row.ATPT_OFCDC_SC_NM,
      schoolCode: row.SD_SCHUL_CODE,
      schoolName: row.SCHUL_NM,
      schoolKind: row.SCHUL_KND_SC_NM,
      address: row.ORG_RDNMA || '',
    }));

    const response = jsonResponse({ ok: true, data: schools });
    response.headers.set('Cache-Control', `public, max-age=${CACHE_SECONDS}`);
    context.waitUntil(cache.put(cacheKey, response.clone()));
    return response;
  } catch (err) {
    const message = err instanceof NeisError ? err.message : '학교 검색 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.';
    return errorResponse(message, 502);
  }
}
