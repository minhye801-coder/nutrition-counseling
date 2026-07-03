import {
  searchSchools,
  jsonResponse,
  errorResponse,
} from "../_lib/neis.js";

export async function onRequestGet(context) {
  try {
    const rows = await searchSchools(
      context.request,
      context.env,
    );

    return jsonResponse({
      ok: true,
      data: rows,
    });
  } catch (error) {
    return errorResponse(error);
  }
}

export function onRequest() {
  return jsonResponse(
    {
      ok: false,
      error: "GET 요청만 사용할 수 있습니다.",
    },
    405,
  );
}
