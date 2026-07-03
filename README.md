# nutrition-counseling

맛마음 탐험소 Lite 공용 체험형입니다. 전국 학교급식 데이터를 활용하며 학생 로그인 없이 바로 체험할 수 있습니다.


> [!IMPORTANT]
> 이 프로젝트는 **Cloudflare Pages용이 아니라 Cloudflare Workers용**입니다.  
> `Pages` 프로젝트로 만들면 정적 파일과 Worker API가 함께 배포되지 않아 404가 발생할 수 있습니다.
>
> 반드시 다음 경로로 생성하세요.
>
> ```text
> Workers & Pages
> → Create
> → Import a repository
> → GitHub 저장소 선택
> → Deploy command: npx wrangler deploy
> ```
>
> 정상 배포 주소는 다음처럼 끝납니다.
>
> ```text
> https://nutrition-counseling.<계정명>.workers.dev
> ```
>
> `nutrition-counseling.pages.dev` 주소는 사용하지 않습니다.

## 주요 특징

- 학생 로그인 없음
- 학생 이름·학년·반·번호 미수집
- 전국 학교 검색
- 선택 학교의 오늘 급식과 다음 급식 조회
- 5회기 핵심 탐험
- 10개 핵심 배지
- 실천 미션과 점검
- 음식 감각·식판·생활리듬·음식 안전 게임
- 탐험노트와 나의 음식생활 설명서
- 활동 데이터는 사용자의 브라우저 `localStorage`에만 저장
- 서버 데이터베이스 없음

## 기술 구조

```text
public/
  index.html       화면
  styles.css       디자인
  app.js           탐험·배지·게임·브라우저 저장

src/
  index.js         Cloudflare Worker API
                   /api/config
                   /api/schools
                   /api/meals

wrangler.jsonc     Worker 및 Static Assets 설정
```

Cloudflare Workers Static Assets가 화면 파일을 제공하고, Worker가 NEIS API 요청을 대신 처리합니다.  
NEIS 인증키는 GitHub 코드에 넣지 않고 Cloudflare의 Secret으로 등록합니다.

---

# 1. GitHub 저장소 만들기

1. GitHub에 로그인합니다.
2. 오른쪽 위 `+` → `New repository`를 선택합니다.
3. 저장소 이름을 다음처럼 입력합니다.

```text
nutrition-counseling
```

4. 공개 배포라면 `Public`을 선택합니다.
5. 저장소를 생성합니다.
6. 이 ZIP의 압축을 푼 뒤 **폴더 안의 파일과 폴더 전체**를 GitHub 저장소에 업로드합니다.

저장소 최상단에서 다음 구조가 보여야 합니다.

```text
public
src
.gitignore
.dev.vars.example
package.json
README.md
wrangler.jsonc
```

> `NEIS_API_KEY` 값을 GitHub 파일에 직접 넣지 마세요.

---

# 2. Cloudflare 계정 준비

1. Cloudflare에 로그인합니다.
2. `Workers & Pages`로 이동합니다.
3. `Create application` 또는 `Create`를 선택합니다.
4. Git 저장소 연결 방식을 선택합니다.
5. GitHub 계정을 연결하고 방금 만든 `nutrition-counseling` 저장소를 선택합니다.
6. Production branch는 `main`으로 둡니다.

## Build 설정

프레임워크는 사용하지 않습니다.

```text
Project name: nutrition-counseling
Production branch: main
Build command: 비워 둠
Deploy command: npx wrangler deploy
Root directory: 비워 둠
```

저장 후 첫 배포를 실행합니다.

첫 배포는 NEIS 인증키가 없어도 앱 화면까지는 배포됩니다. 배포 결과 주소가 반드시 `workers.dev`로 끝나는지 확인하세요.  
학교 검색을 사용하려면 다음 단계에서 Secret을 등록해야 합니다.

---

# 3. NEIS 인증키를 Cloudflare Secret으로 등록

Cloudflare에서 배포된 Worker를 선택한 뒤:

```text
Settings
→ Variables and Secrets
→ Add
```

다음과 같이 등록합니다.

```text
Type: Secret
Variable name: NEIS_API_KEY
Value: 본인의 나이스 교육정보 개방포털 인증키
```

저장·배포한 후 Worker 주소를 다시 엽니다.

> 이 값은 GitHub 저장소나 브라우저 JavaScript에 노출되지 않습니다.

---

# 4. 작동 시험

배포 주소 예시:

```text
https://nutrition-counseling.<계정>.workers.dev
```

다음 순서로 확인합니다.

1. 경상북도교육청 선택
2. 초등학교 선택
3. 학교명에 `봉곡` 입력
4. 학교 검색
5. 학교 선택
6. 오늘 급식 또는 다음 급식 표시 확인
7. 오늘의 탐험 저장
8. 홈에서 1/5와 2/10 배지 확인
9. 브라우저를 새로고침해 기록 유지 확인
10. `기록 초기화`로 삭제 확인

---

# 5. GitHub 수정 후 자동 배포

Cloudflare Git integration이 연결되어 있으면 `main` 브랜치에 새 commit이 올라갈 때마다 자동으로 다시 배포됩니다.

예:

```text
public/app.js 수정
→ GitHub에 Commit changes
→ Cloudflare 자동 빌드
→ 새 버전 배포
```

Cloudflare 대시보드의 Worker → `Deployments` 또는 `Builds`에서 진행상태를 확인할 수 있습니다.

---

# 6. 컴퓨터에서 로컬 실행하기

Node.js가 설치된 컴퓨터에서:

```bash
npm install
```

`.dev.vars.example`을 복사하여 `.dev.vars` 파일을 만들고 실제 인증키를 입력합니다.

```text
NEIS_API_KEY=실제_인증키
```

개발 서버:

```bash
npm run dev
```

배포:

```bash
npm run deploy
```

`.dev.vars`는 `.gitignore`에 포함되어 GitHub에 올라가지 않습니다.

---

# 개인정보와 데이터 저장

## 서버에 저장하지 않는 정보

- 학생 이름
- 학년·반·번호
- 상담정보
- 탐험 답변
- 미션 점검
- 게임 점수
- 배지 진행상황

## 브라우저에 저장되는 정보

다음 정보는 사용자의 현재 브라우저 `localStorage`에만 저장됩니다.

- 선택 학교
- 날짜별 탐험기록
- 미션 점검
- 게임 결과
- 배지 진행상황

브라우저 또는 기기를 바꾸면 기록이 이어지지 않습니다.  
시크릿 모드는 창을 닫으면 기록이 삭제될 수 있습니다.

---

# NEIS API 캐시

Worker는 학교 검색과 급식 조회 결과를 약 6시간 캐시합니다.

- 같은 학교와 날짜를 반복 조회할 때 NEIS 호출 감소
- 강의 중 다수 사용자가 동시에 접속할 때 응답 안정화
- 캐시 키에는 NEIS 인증키를 포함하지 않음

---

# 공개 전 확인사항

- 앱 명칭과 저작권 표기
- 공개 라이선스 결정
- 개인정보 안내 문구
- NEIS 출처 표시
- 강의용 QR코드
- 모바일 화면 시험
- 동일 학교 다중 접속 시험

라이선스는 학교 또는 제작자의 권리관계를 확인한 뒤 `LICENSE` 파일을 추가하세요.
