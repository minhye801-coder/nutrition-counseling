import { getKstDateString, formatDateDisplay, jsonResponse } from '../_lib/neis.js';

export async function onRequestGet(context) {
  const { env } = context;

  return jsonResponse({
    ok: true,
    data: {
      systemName: '맛마음 탐험소 by.미네쌤',
      version: '1.0.0',
      today: formatDateDisplay(getKstDateString(0)),
      neisKeyRegistered: Boolean(env.NEIS_API_KEY),
      privacy:
        '이 웹앱은 학생 이름, 학년/반/번호, 보호자 정보, 상담정보, 이메일, 회원가입 정보를 수집하지 않습니다. ' +
        '탐험 기록은 서버나 데이터베이스에 저장되지 않고, 지금 사용 중인 브라우저의 localStorage에만 저장됩니다.',
    },
  });
}
