# 포트폴리오 콘텐츠 기획서

이 문서는 포트폴리오 사이트에 포함할 콘텐츠 방향과 공개 가능한 작성 기준을 정리한 문서입니다. 공개 저장소에 포함되는 문서이므로 개인정보, 비공개 업무 정보, 내부 추정 메모는 작성하지 않습니다.

## 기본 방향

포트폴리오는 다음 메시지를 중심으로 구성합니다.

> FastAPI와 Python 기반 백엔드 개발을 중심으로 RAG/LLM 서비스, MCP 기반 지식 관리, 개발 자동화 도구를 만드는 개발자

강조할 축은 다음과 같습니다.

- 실무 경험: FastAPI와 RAG 기반 서비스 개발 경험
- AI/LLM: RAG, LangChain, OpenAI API, AI Agent, MCP
- 개발 자동화: GitHub Actions, PyPI 패키징, 문서화 자동화
- 조직 프로젝트: `HippoBox`, `Blueprint4Agent`, `Say-It-It-s-OK`, `TodayInTech`
- 기술 기록: Velog 기반 개발 과정 정리

## 공개 정보 작성 기준

공개 가능한 정보:

- 이름: `Choi Hyuk`
- GitHub: https://github.com/choi-hyk
- Velog: https://velog.io/@choi-hyk/posts
- 이메일: 공개용 이메일만 사용
- 학력: 명지대학교 컴퓨터공학과
- 회사명: 공개 가능한 범위에서만 사용
- 프로젝트명, 공개 저장소 링크, 공개 문서 링크

공개 문서에 쓰지 않는 정보:

- 생년월일, 나이, 전화번호, 상세 주소
- private 저장소 내용
- 회사 내부 프로젝트명, 고객사명, 내부 아키텍처 상세
- 확정되지 않은 입사일, 졸업일, 성과 수치
- “확인 필요”, “추정”, “메모”처럼 내부 검토용 표현

## 페이지 구조

포트폴리오 첫 화면은 채용 담당자와 개발자가 빠르게 읽을 수 있는 구조를 우선합니다.

1. Hero
   - 이름
   - 한 줄 소개
   - GitHub, Velog, Email 링크

2. About
   - 관심 영역
   - 실무 경험 요약
   - 개발자로서의 방향성

3. Experience
   - FastAPI/RAG 기반 서비스 개발 경험
   - 공개 가능한 업무 범위만 작성

4. Projects
   - HippoBox
   - Blueprint4Agent / B4A
   - 말하면 OK
   - Today in Tech
   - velog-sync
   - note_agent
   - RhythmE

5. Writing
   - Velog 대표 글
   - 프로젝트 개발기
   - FastAPI, RAG, 자동화 관련 글

6. Skills
   - Backend
   - AI/LLM
   - Frontend
   - Automation/Deployment

7. Education & Contact
   - 명지대학교 컴퓨터공학과
   - GitHub, Velog, Email

## 프로필 문구

### 한 줄 소개

FastAPI와 AI 서비스를 실제 제품 구조로 연결하는 백엔드 개발자

### 소개 문구

FastAPI와 Python 기반 백엔드 개발을 중심으로 RAG/LLM 서비스, MCP 기반 지식 관리, 개발 자동화 도구를 만들고 있습니다. 실무에서는 FastAPI와 RAG 기반 서비스 개발을 경험하고 있으며, 개인 및 조직 프로젝트를 통해 AI 애플리케이션을 제품 구조로 구현하는 데 집중하고 있습니다.

## Experience 작성 기준

회사 경험은 공개 가능한 범위에서 역할과 기술 중심으로 작성합니다.

예시:

```text
Backend / AI Application Developer

- FastAPI 기반 서비스 개발 및 유지보수
- RAG 기반 기능 개발 참여
- Python 백엔드에서 sync/async, ASGI, blocking/non-blocking 구조 학습 및 적용
- LLM 기반 기능 개발 과정에서 데이터 처리, API 설계, 응답 품질 개선 흐름 경험
```

주의:

- 비공개 서비스명과 고객사명은 작성하지 않습니다.
- 내부 코드 구조, 배포 환경, 인프라 상세는 공개하지 않습니다.
- 성과 수치는 공개 가능하고 근거가 있을 때만 작성합니다.

## 기술 스택

우선 강조할 스택:

- Backend: Python, FastAPI
- AI/LLM: RAG, LangChain, OpenAI API, MCP
- Frontend: TypeScript, React, Svelte
- Automation: GitHub Actions, PyPI packaging
- Deployment: Vercel, GitHub Pages

보조 스택:

- Java, C, C++
- Dart, Flutter
- HTML, CSS, JavaScript

기술 스택은 많이 나열하기보다 실제 프로젝트와 연결해 설명 가능한 항목을 우선합니다.

## 주요 프로젝트

### 1. HippoBox

조직: https://github.com/HippoBox  
저장소: https://github.com/HippoBox/hippobox

여러 AI 서비스에서 함께 사용할 수 있는 개인 지식 베이스 서비스입니다. FastAPI 기반 백엔드, 지식 CRUD, 임베딩 기반 semantic search, MCP 연동을 통해 MCP 호환 클라이언트에서 개인 지식을 활용할 수 있도록 구성한 프로젝트입니다.

강조 포인트:

- FastAPI 기반 지식 관리 API
- 임베딩 기반 semantic search
- MCP 서버 연동
- TypeScript 기반 프론트엔드와 Python 백엔드 통합
- 패키지 실행 흐름 제공
- Organization 기반 프로젝트 운영

사이트 문구:

> 여러 AI 서비스에서 공통으로 사용할 수 있는 개인 지식 베이스 서비스입니다. FastAPI 기반 API, 임베딩 검색, MCP 연동을 통해 MCP 호환 클라이언트에서 저장된 지식을 활용할 수 있도록 구성했습니다.

### 2. Blueprint4Agent / B4A

조직: https://github.com/Blueprint4Agent  
문서: https://blueprint4agent.github.io/  
주요 저장소:

- https://github.com/Blueprint4Agent/B4FastAPI
- https://github.com/Blueprint4Agent/B4Bot

Agentic coding workflow를 위한 프로젝트 템플릿과 자동화 기반을 구성하는 조직 프로젝트입니다. B4FastAPI는 FastAPI 기반 풀스택 웹 서버 블루프린트이고, B4Bot은 GitHub 저장소를 점검해 범위가 정리된 관리 이슈를 생성하는 Agent 기반 GitHub Action입니다.

강조 포인트:

- FastAPI, SQLAlchemy, Alembic, Redis 기반 백엔드 템플릿
- React, TypeScript, OpenAPI 타입 생성 기반 프론트엔드
- Docker, Makefile, CI, 테스트, 빌드 워크플로우
- Agent 기반 코드 리뷰/이슈 생성 GitHub Action
- Docusaurus 기반 조직 문서 사이트

사이트 문구:

> Agentic coding workflow에 맞춘 FastAPI 풀스택 서버 블루프린트와 GitHub 자동화 도구를 설계했습니다. 서버 템플릿, 문서, CI, 테스트 흐름을 표준화하고, 저장소 관리 이슈 생성을 자동화하는 구조를 구성했습니다.

### 3. 말하면 OK

조직: https://github.com/Say-It-It-s-OK  
주요 저장소:

- https://github.com/Say-It-It-s-OK/client
- https://github.com/Say-It-It-s-OK/server
- https://github.com/Say-It-It-s-OK/nlp

음성 인식 기반 키오스크 서비스 프로젝트입니다. 사용자의 음성 또는 터치 입력을 받아 주문과 추천 기능을 제공하고, NLP 서버에서 음성 텍스트를 처리해 API 서버와 연동하는 구조입니다.

강조 포인트:

- React + TypeScript 기반 클라이언트
- Node.js API 서버
- MongoDB 기반 주문/메뉴 데이터 처리
- FastAPI 기반 NLP 서버
- OpenAI 기반 음성 텍스트 처리
- STT/TTS 기반 키오스크 사용자 경험

사이트 문구:

> 음성 인식 기반 키오스크 서비스에서 클라이언트, API 서버, NLP 서버가 분리된 구조를 구성했습니다. FastAPI 기반 NLP 서버에서 음성 텍스트를 처리하고, API 서버와 연동해 주문 및 추천 흐름을 지원했습니다.

### 4. Today in Tech

조직: https://github.com/TodayInTech  
저장소: https://github.com/TodayInTech/todayintech  
배포: https://todayintech.github.io/todayintech/

기술 뉴스와 공식 기술 블로그를 수집하고, AI 기반 News Editor Agent로 의미 있는 글을 선별해 Docusaurus 문서 사이트로 누적 배포하는 큐레이션 아카이브입니다.

강조 포인트:

- Python 기반 수집/전처리/enrichment/writer 파이프라인
- RSS/Atom, sitemap 기반 수집 전략
- GitHub Actions와 GitHub Pages 배포
- OpenAI API 기반 Writer Agent
- Organization 저장소 기반 운영

사이트 문구:

> 기술 뉴스와 공식 기술 블로그를 매일 수집하고, AI Agent가 의미 있는 글을 선별해 문서 사이트로 누적 배포하는 큐레이션 아카이브입니다. 수집, 전처리, 원문 enrichment, Writer Agent, 배포 흐름을 분리해 운영 가능한 파이프라인 구조를 구성했습니다.

### 5. velog-sync

저장소: https://github.com/choi-hyk/velog_sync  
PyPI: https://pypi.org/project/velog-sync/

Velog 글을 GraphQL API로 가져와 시리즈별 폴더와 Markdown 파일로 저장하는 Python 패키지입니다.

강조 포인트:

- Velog GraphQL API 기반 게시글 수집
- Markdown 백업 파일 생성
- PyPI 패키지 배포
- GitHub Actions 자동 동기화 예시
- CLI 형태의 재사용 가능한 도구

사이트 문구:

> Velog 게시글을 GraphQL API로 수집해 시리즈별 Markdown 파일로 백업하는 Python CLI 패키지를 만들고 PyPI에 배포했습니다. GitHub Actions 예시를 함께 제공해 블로그 글을 저장소에 자동 동기화할 수 있도록 구성했습니다.

### 6. note_agent

저장소: https://github.com/choi-hyk/note_agent

FastAPI와 LangServe 기반의 노트 작성 Agent 서버 프로젝트입니다.

강조 포인트:

- FastAPI 서버 구성
- OpenAI API 기반 Writer Agent 실행 환경
- LangServe Playground 제공
- FastAPI 생태계 버전 호환성 트러블슈팅

사이트 문구:

> FastAPI와 LangServe를 사용해 노트 작성 Agent 서버를 구성했습니다. OpenAI API 기반 Agent 실행 환경과 Swagger/LangServe Playground를 제공하고, FastAPI 생태계의 버전 호환성 문제를 정리했습니다.

### 7. RhythmE

저장소: https://github.com/choi-hyk/RhythmE  
배포: https://choi-hyk.github.io/RhythmE/

JavaScript로 구현한 리듬 게임 프로젝트입니다.

강조 포인트:

- HTML/CSS/JavaScript 기반 브라우저 게임
- 난이도별 스테이지
- 캐릭터와 블록 입력 규칙
- 게임 결과 이미지 저장 기능

사이트 문구:

> JavaScript로 리듬 게임을 구현하고, 난이도별 스테이지와 입력 규칙, 결과 이미지 저장 기능을 구성했습니다. 초기 개인 프로젝트로 인터랙션, 상태 관리, 브라우저 기반 게임 루프를 경험한 사례입니다.

## Writing 섹션

Velog는 단순 링크가 아니라 기술 기록 섹션으로 보여줍니다.

추천 섹션명:

- Writing
- Technical Notes
- Development Blog

대표 글 후보:

- `[HippoBox] HippoBox 시작하기`
- `[FastAPI] sync/async 의 논리적 구조`
- `[Mini Project] Velog Backup 프로그램 만들기`
- `[GitHub Pages]` 시리즈

소개 문구:

> 실무와 개인 프로젝트에서 만난 문제를 Velog에 정리하고 있습니다. FastAPI의 sync/async 구조, 개인 사이트 구현, Velog 백업 자동화 도구 제작 등 개발 과정에서 생긴 의문과 해결 과정을 기록합니다.

## 우선순위

가장 먼저 보여줄 항목:

1. FastAPI/RAG 실무 경험
2. HippoBox
3. Blueprint4Agent / B4A
4. 말하면 OK
5. Today in Tech
6. velog-sync
7. Velog 기술 글

보조로 보여줄 항목:

1. RhythmE
2. note_agent
3. 학교 프로젝트
4. 알고리즘/학습 저장소

최소화할 항목:

1. private 저장소의 민감한 내용
2. 단순 fork 저장소
3. 설명이 부족한 실험용 저장소
4. 공개 근거가 없는 성과 수치

## 보완 작업

- 프로젝트별 README에 문제 정의, 역할, 기술 선택 이유, 결과 화면을 추가합니다.
- 프로젝트별 스크린샷 또는 짧은 데모 영상을 준비합니다.
- 회사 경험은 공개 가능한 범위에서 역할과 기술 중심으로 정리합니다.
- 이름 표기는 `Choi Hyuk`으로 통일합니다.
- 콘텐츠 문구는 `src/i18n/dictionaries.ts`의 한국어 사전을 기준으로 관리합니다.
