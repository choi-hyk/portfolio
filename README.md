# Choi Hyuk 포트폴리오

Next.js 기반 포트폴리오 사이트입니다. Vercel 배포를 전제로 구성했습니다.

## 스택

- Next.js App Router
- TypeScript
- Tailwind CSS
- MDX
- lucide-react
- npm

## 스크립트

```bash
npm run dev
npm run format
npm run format:check
npm run lint
npm run lint:fix
npm run typecheck
npm run check
npm run build
npm run harness
npm run start
```

## 구조

```text
src/app/          App Router 페이지
src/components/   공용 UI 컴포넌트
src/data/         프로필, 프로젝트, 글 데이터
src/types/        프로젝트 내부 타입 선언
src/i18n/         언어 설정과 사전
content/          향후 MDX 프로젝트/글 콘텐츠
harness/          프로젝트 규칙 문서
```

## 하네스

프로젝트 규칙은 [harness/README.md](./harness/README.md)에 정리한다.

커밋 메시지는 Conventional Commits를 따르되, subject는 한국어로 작성한다. 이 저장소는 `.githooks/commit-msg`를 버전 관리되는 Git hook으로 사용한다.

공개 저장소에 포함되는 문서는 [공개 문서 작성 규칙](./harness/public-docs.md)을 따른다.

포맷, 린트, 타입 체크, IDE 설정은 [개발 도구 규칙](./harness/tooling.md)을 따른다.

## 로컬 개발

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 연다.
