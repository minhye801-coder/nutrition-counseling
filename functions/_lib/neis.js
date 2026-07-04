const NEIS_BASE = 'https://open.neis.go.kr/hub';

export class NeisError extends Error {}

export function jsonResponse(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}

export function errorResponse(message, status = 400) {
  return jsonResponse({ ok: false, error: message }, status);
}

export function getKstDateString(offsetDays = 0) {
  const now = new Date();
  const kstMs = now.getTime() + (9 * 60 + now.getTimezoneOffset()) * 60000;
  const kst = new Date(kstMs);
  kst.setDate(kst.getDate() + offsetDays);
  const y = kst.getFullYear();
  const m = String(kst.getMonth() + 1).padStart(2, '0');
  const d = String(kst.getDate()).padStart(2, '0');
  return `${y}${m}${d}`;
}

export function formatDateDisplay(ymd) {
  if (!ymd || ymd.length !== 8) return ymd;
  return `${ymd.slice(0, 4)}-${ymd.slice(4, 6)}-${ymd.slice(6, 8)}`;
}

export function addDaysToYmd(ymd, days) {
  const y = Number(ymd.slice(0, 4));
  const m = Number(ymd.slice(4, 6)) - 1;
  const d = Number(ymd.slice(6, 8));
  const dt = new Date(Date.UTC(y, m, d));
  dt.setUTCDate(dt.getUTCDate() + days);
  const yy = dt.getUTCFullYear();
  const mm = String(dt.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(dt.getUTCDate()).padStart(2, '0');
  return `${yy}${mm}${dd}`;
}

export function splitBr(text) {
  if (!text) return [];
  return text
    .split(/<br\s*\/?>/i)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function cleanDishName(name) {
  return name
    .replace(/\([0-9.\s]+\)/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function parseNeisPayload(json, endpoint) {
  if (json.RESULT) {
    const code = json.RESULT.CODE || '';
    if (code === 'INFO-200') return [];
    throw new NeisError(json.RESULT.MESSAGE || '나이스 API에서 오류가 발생했습니다.');
  }
  const body = json[endpoint];
  if (!Array.isArray(body) || body.length < 2) return [];
  const rowsPart = body.find((part) => Array.isArray(part && part.row));
  return rowsPart ? rowsPart.row : [];
}

export async function callNeis(apiKey, endpoint, params) {
  const url = new URL(`${NEIS_BASE}/${endpoint}`);
  url.searchParams.set('KEY', apiKey);
  url.searchParams.set('Type', 'json');
  url.searchParams.set('pIndex', '1');
  url.searchParams.set('pSize', String(params.pSize || 100));

  for (const [key, value] of Object.entries(params)) {
    if (key === 'pSize') continue;
    if (value === undefined || value === null || value === '') continue;
    url.searchParams.set(key, value);
  }

  let res;
  try {
    res = await fetch(url.toString());
  } catch (err) {
    throw new NeisError('나이스 서버에 연결할 수 없습니다. 잠시 후 다시 시도해 주세요.');
  }

  if (!res.ok) {
    throw new NeisError('나이스 서버 응답 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
  }

  let json;
  try {
    json = await res.json();
  } catch (err) {
    throw new NeisError('나이스 서버 응답을 해석할 수 없습니다.');
  }

  return parseNeisPayload(json, endpoint);
}
