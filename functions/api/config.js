import {
  getPublicConfig,
  jsonResponse,
  errorResponse,
} from "../_lib/neis.js";

export async function onRequestGet(context) {
  try {
    return jsonResponse({
      ok: true,
      data: getPublicConfig(context.env),
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
