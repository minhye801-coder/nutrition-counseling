# 맛마음 탐험소 Lite

전국 학교급식 기반 식생활 탐험 웹앱

## 1. 프로젝트 소개

**맛마음 탐험소 Lite**는 영양교사 연수나 강의에서 선생님들이 QR코드로 접속하여 자신의 학교 급식 정보를 기반으로 "맛마음 탐험" 체험 활동을 직접 해볼 수 있는 **공용 체험 웹앱**입니다.

- 로그인이나 회원가입 없이 바로 접속할 수 있습니다.
- 학생 개인 상담용 시스템이 **아닙니다.** 이름, 학년/반/번호, 보호자 정보, 상담정보, 이메일, 회원가입 정보를 **전혀 수집하지 않습니다.**
- 학교 검색과 급식 조회만 서버(Cloudflare Pages Functions)에서 처리하고, 탐험 활동 기록은 서버나 데이터베이스에 저장하지 않으며 **오직 사용 중인 브라우저의 localStorage에만** 저장됩니다.

## 2. 기능 목록

- 전국 시도교육청 · 학교급 · 학교 이름 검색을 통한 학교 선택 (NEIS 학교기본정보 API)
- 학교 선택 후 별명 입력: 실명 없이 별명만으로 나만의 진행 기록을 구분 (같은 기기·같은 학교에서도 별명별로 기록이 분리되며, 저장된 별명 목록에서 이어서 시작하거나 "다른 친구로 전환"할 수 있음)
- 선택한 학교의 오늘 급식 및 다음 급식일 조회 (NEIS 급식식단정보 API)
- **오늘의 탐험** 3단계 활동: 느낌 찾기 → 어려움과 전략 → 나의 미션 (1단계에서 오늘/내일/특정일 급식을 골라 그 날짜의 메뉴로 탐험 가능, 특정일은 달력에서 선택)
- 서로 다른 날짜 기준 최대 5회기의 핵심 탐험 진행 관리 (같은 날짜 재저장 시 회기 중복 증가 없음)
- 회기 완료에 따라 자동으로 열리는 10개의 배지
- 미션 돌아보기(점검 및 한 줄 회고), 최근 점검 기록
- 오늘의 한마디: 회기 테마에 맞는 영양상담 질문 카드를 타로카드처럼 뒤집어 보며 학생과 대화하는 활동 (응답 기록은 선택사항)
- 나의 맛마음 나무: 완료한 회기 수에 따라 씨앗부터 만개까지 자라는 성장 캐릭터를 메인 화면에 표시
- 오늘의 탐험을 저장할 때마다 컨페티 애니메이션과 랜덤 격려 도장으로 완료를 축하
- 메인 화면의 추천 배너가 완료 회기 수에 맞춰 오늘의 한마디/자유게임/미션 돌아보기/탐험노트를 번갈아 추천해 5회기 동안 다양한 코너를 경험하도록 유도
- 자유게임 4종 (음식 감각 탐정 / 식판 친구 찾기 / 생활리듬 퀘스트 / 음식 안전 신호), 각 3문항 객관식, 문제당 10초 제한을 두는 타임어택 모드 선택 가능
- 탐험노트: 자동 생성되는 "나의 음식생활 설명서"와 회기별 기록 열람(최신순/시간순)
- 체험 데이터 안내 화면 및 "현재 학교 체험기록 삭제" 기능
- 백업 큐알/주소로 다른 기기·브라우저에서 탐험 기록 이어가기 (서버 저장 없이 큐알/주소 자체에 기록을 담는 방식)
- 모바일 우선 반응형, 보라색·초록색 계열의 밝고 친근한 카드형 디자인

## 3. 폴더 구조

```
nutrition-counseling/
├─ public/
│  ├─ index.html
│  ├─ styles.css
│  ├─ app.js
│  ├─ _headers
│  └─ _routes.json
├─ functions/
│  ├─ api/
│  │  ├─ config.js
│  │  ├─ schools.js
│  │  └─ meals.js
│  └─ _lib/
│     └─ neis.js
├─ package.json
├─ .gitignore
├─ .dev.vars.example
└─ README.md
```

## 4. GitHub 업로드 방법

```bash
git init
git add .
git commit -m "Initial commit: 맛마음 탐험소 Lite"
git branch -M main
git remote add origin https://github.com/사용자명/nutrition-counseling.git
git push -u origin main
```

이미 저장소를 만들어 두었다면 `git remote add` 대신 해당 저장소 주소로 push 하면 됩니다.

## 5. Cloudflare Pages Git 연결 방법

1. [Cloudflare 대시보드](https://dash.cloudflare.com/) → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
2. 방금 업로드한 GitHub 저장소(`nutrition-counseling`)를 선택합니다.
3. 아래 "6. 정확한 빌드 설정" 값을 그대로 입력합니다.
4. **Save and Deploy**를 누릅니다.

## 6. 정확한 빌드 설정

| 항목 | 값 |
|---|---|
| Framework preset | `None` |
| Build command | (비워 둠, 또는 `exit 0`) |
| Build output directory | `public` |
| Root directory | (비워 둠) |
| Production branch | `main` |

저장소 루트에는 반드시 `public`과 `functions` 폴더가 함께 있어야 합니다.

## 7. NEIS_API_KEY Secret 등록 방법

1. [나이스 교육정보 개방포털](https://open.neis.go.kr/)에서 인증키를 발급받습니다.
2. Cloudflare 대시보드 → 해당 Pages 프로젝트 → **Settings** → **Environment variables**
3. **Production**(및 필요 시 **Preview**) 환경에 다음을 추가합니다.
   - 변수명: `NEIS_API_KEY`
   - 값: 발급받은 인증키
   - **Encrypt(Secret)** 옵션을 선택합니다.
4. 저장 후 **재배포(Retry deployment / 새 배포)** 를 해야 함수에 반영됩니다.

인증키는 절대 클라이언트 코드나 GitHub 저장소에 직접 넣지 않습니다. Pages Function에서는 `context.env.NEIS_API_KEY`로만 접근합니다.

## 8. 로컬 실행 방법

```bash
npm install
cp .dev.vars.example .dev.vars
# .dev.vars 파일을 열어 실제 NEIS_API_KEY 값을 입력합니다.
npm run dev
```

`npm run dev`는 `wrangler pages dev public`을 실행하며, `functions` 폴더의 API도 함께 로컬에서 동작합니다. 기본 접속 주소는 `http://localhost:8788` 입니다.

## 9. 배포 후 확인 주소

- https://nutrition-counseling.pages.dev/
- https://nutrition-counseling.pages.dev/index.html
- https://nutrition-counseling.pages.dev/api/config

## 10. 개인정보 저장 방식

- 이 웹앱은 학생 이름, 학년/반/번호, 보호자 정보, 상담정보, 이메일, 회원가입 정보를 **수집하지 않습니다.**
- 서버는 오직 학교 검색(`/api/schools`)과 급식 조회(`/api/meals`)만 처리하며, 이 요청·응답을 데이터베이스에 저장하지 않습니다.
- 탐험 기록(느낌, 이야기, 전략, 미션, 자신감, 게임 기록 등)은 **사용 중인 브라우저의 `localStorage`** (`tasteMindLitePublicV1` 키) 에만 저장됩니다.
- 학교를 고른 뒤 입력하는 "별명"은 실명이 아닌 자유 입력 텍스트이며, 같은 학교·같은 기기에서도 별명별로 기록이 분리되어 저장됩니다. (기존에 별명 없이 쓰던 기록은 자동으로 "기본" 별명으로 옮겨집니다.)
- 브라우저나 기기를 바꾸면 기록이 이어지지 않으며, 시크릿 모드에서는 창을 닫으면 기록이 사라질 수 있습니다.
- "체험 데이터 안내" 화면의 "백업 큐알 만들기"로 큐알/주소를 만들면, 그 안에 기록이 그대로 담겨 다른 기기·브라우저에서 이어갈 수 있습니다. 이 경우에도 서버에는 아무것도 저장되지 않으며, 큐알/주소 자체가 곧 기록이므로 잃어버리면 그 기록도 사라집니다. 자유게임 기록은 백업에 최근 10개까지만 담깁니다.
- 앱 내 "체험 데이터 안내" 화면에서 현재 학교의 기록을 언제든지 삭제할 수 있습니다.

## 11. 문제 해결 방법

| 증상 | 원인 / 해결 |
|---|---|
| 루트(`/`) 접속 시 404 | Build output directory가 `public`으로 설정되어 있는지, 저장소 루트에 `public/index.html`이 있는지 확인하세요. |
| `/api/config`가 JSON이 아니라 HTML을 반환 | `functions` 폴더가 저장소 루트에 있는지, `public/_routes.json`이 `/api/*`만 포함하는지 확인하세요. |
| "서버에 NEIS_API_KEY가 등록되어 있지 않습니다" 오류 | Cloudflare Pages 환경변수에 `NEIS_API_KEY`를 등록했는지, 등록 후 재배포했는지 확인하세요. |
| 학교 검색 결과가 비어 있음 | 학교 이름을 2글자 이상 입력했는지, 시도교육청/학교급 선택이 실제 학교와 일치하는지 확인하세요. |
| 급식 정보가 계속 "없음"으로 나옴 | 방학·주말 등 실제로 급식이 없는 날일 수 있습니다. NEIS 사이트에서 직접 확인해 보세요. 최대 6시간 캐시되므로 학교의 급식 정보가 방금 등록되었다면 잠시 후 다시 시도하세요. |
| 로컬 개발 중 API 호출 실패 | `.dev.vars` 파일에 `NEIS_API_KEY`를 넣었는지 확인하세요. `.dev.vars`는 git에 커밋되지 않습니다(`.gitignore` 참고). |
| 탐험 기록이 사라짐 | localStorage는 브라우저/기기별로 분리되어 저장되며, 시크릿 모드나 브라우저 데이터 삭제 시 함께 삭제됩니다. |
