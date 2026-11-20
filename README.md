# my-hub

관심 있는 정보와 자주 쓰는 서비스를 한곳에서 찾아볼 수 있는 포털 사이트입니다.

## 시작하기

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 엽니다.

## Vercel 프로젝트 자동 불러오기

내 Vercel 프로젝트 목록을 표시하려면 Vercel 계정 설정에서 읽기 권한이 있는 액세스 토큰을 만든 뒤 `VERCEL_TOKEN` 환경 변수로 설정합니다. 로컬에서는 `.env.local`에 값을 넣고, 배포에서는 Vercel 프로젝트의 **Settings → Environment Variables**에 등록한 다음 다시 배포하세요. 토큰은 서버에서만 사용되며 브라우저로 전달되지 않습니다.

팀 프로젝트만 표시하려면 선택적으로 `VERCEL_TEAM_ID` 또는 `VERCEL_TEAM_SLUG`도 설정할 수 있습니다. 값이 없거나 프로젝트를 불러오지 못하면 페이지는 기본 프로젝트 목록을 표시합니다.

변수 이름은 [.env.example](.env.example)을 참고하세요. 비밀 토큰을 Git에 커밋하지 마세요.

## 배포

GitHub 저장소를 Vercel 프로젝트로 가져오면 배포할 수 있습니다. 프로젝트 루트는 `my-hub` 디렉터리입니다.
