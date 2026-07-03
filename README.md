# nutrition-counseling

맛마음 탐험소 Lite 공용 체험형의 **Cloudflare Pages Functions 버전**입니다.

## 배포 대상

```text
https://nutrition-counseling.pages.dev
```

이 프로젝트는 기존 Cloudflare Pages 프로젝트를 그대로 사용합니다.

## 구조

```text
public/
  index.html
  styles.css
  app.js
  _headers
  _routes.json

functions/
  api/
    config.js
    schools.js
    meals.js
  _lib/
    neis.js
```

`public`은 화면을 제공하고, `functions/api`는 학교 검색과 급식 조회를 처리합니다.

## Cloudflare Pages 설정

```text
Framework preset: None
Build command: exit 0
Build output directory: public
Root directory: 비워 둠
```

Cloudflare Pages는 정적 파일의 위치를 Build output directory로 지정해야 합니다.  
이 프로젝트에서는 반드시 `public`을 입력합니다.

## Secret

Pages 프로젝트의 Settings → Variables and Secrets에서 다음 값을 등록합니다.

```text
NEIS_API_KEY=나이스 인증키
```

Secret은 Production 환경에 등록하고 이후 새 배포를 실행합니다.

## 연결 확인

아래 주소를 먼저 엽니다.

```text
https://nutrition-counseling.pages.dev/api/config
```

정상 예시:

```json
{
  "ok": true,
  "data": {
    "systemName": "맛마음 탐험소 Lite",
    "version": "2.1.0-pages",
    "apiKeyRegistered": true
  }
}
```

그다음 메인 주소를 엽니다.

```text
https://nutrition-counseling.pages.dev
```

## 데이터 저장

학생 이름과 학년·반·번호는 입력받지 않습니다.  
탐험기록, 미션, 배지, 게임 결과는 브라우저 localStorage에만 저장됩니다

배포확인
