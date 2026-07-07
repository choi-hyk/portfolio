# Choi Hyuk Portfolio

AI 애플리케이션, 백엔드 API, Agent Workflow, Knowledge System을 중심으로 구성한 개인 포트폴리오입니다.

이 사이트는 단순한 카드형 포트폴리오가 아니라, 프로젝트의 목표와 구조를 캔버스 기반 노드로 보여주는 형태로 구성되어 있습니다. 각 프로젝트는 Overview, Project Goals, System Architecture, Features, Results, Lessons Learned 흐름으로 정리하며, 프로젝트별 기술 흐름과 구현 경험을 한 화면에서 탐색할 수 있도록 설계했습니다.

## What I Build

- AI Application
- Backend API
- Agent Workflow
- Knowledge Systems

## Primary Stack

- Python
- FastAPI
- TypeScript
- React
- Docker

## Featured Projects

- **HippoBox**: 개인 지식을 저장하고 AI Agent가 활용할 수 있도록 설계한 Knowledge Management Platform
- **Blueprint4Agent / B4A**: 에이전틱 코딩 기반 AI 애플리케이션을 빠르게 시작하기 위한 FastAPI 기반 프로젝트 블루프린트
- **말하면 OK**: 사용자의 자연어 음성 요청을 키오스크 행동으로 연결하는 AI Voice Kiosk
- **Today in Tech**: 기술 뉴스와 공식 기술 블로그를 AI 기반으로 선별하고 축적하는 Knowledge Archive

## Site Structure

```text
src/app/                                      Next.js App Router 페이지
src/components/canvas/                       공용 캔버스 렌더링 컴포넌트
src/components/pages/home/                   Overview 캔버스
src/components/pages/projects/               프로젝트 메인 캔버스
src/components/pages/project-detail/         프로젝트 상세 캔버스
src/components/pages/project-detail/definitions/
                                              프로젝트별 노드/엣지 정의
src/components/shell/                        포트폴리오 프레임과 사이드바
src/i18n/                                    정적 사전과 프로젝트 메타데이터
src/types/                                   내부 타입
public/                                      아이콘, 이미지, 정적 자산
harness/                                     개발 규칙 문서
```

## Local Development

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 엽니다.

## Validation

기본 검증은 프로젝트 하네스를 따릅니다.

```bash
npm run harness
```

단일 확인이 필요할 때는 아래 명령을 사용할 수 있습니다.

```bash
npm run format:check
npm run lint
npm run typecheck
npm run build
```

## Deployment

이 저장소는 GitHub Pages 정적 배포를 기준으로 구성되어 있습니다.

- 배포 문서: [DEPLOY.md](./DEPLOY.md)
- 배포 워크플로우: [.github/workflows/deploy.yml](./.github/workflows/deploy.yml)
- 배포 URL: `https://choi-hyk.github.io/portfolio/`

## Project Harness

새 페이지와 새 프로젝트를 추가할 때는 반드시 하네스 문서를 먼저 확인합니다.

- [harness/README.md](./harness/README.md)
- [harness/frontend.md](./harness/frontend.md)
- [harness/pages.md](./harness/pages.md)
- [harness/deploy.md](./harness/deploy.md)
- [harness/i18n.md](./harness/i18n.md)
- [harness/public-docs.md](./harness/public-docs.md)
- [harness/tooling.md](./harness/tooling.md)
- [harness/commit.md](./harness/commit.md)

특히 프로젝트 상세 페이지를 추가할 때는 기존 `HippoBox`, `Blueprint4Agent`, `Today in Tech`, `말하면 OK` 정의를 먼저 참고하고, 동일한 노드 스타일과 섹션 순서를 유지합니다.
