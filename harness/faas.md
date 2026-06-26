# FaaS 확장 규칙

포트폴리오는 정적 사이트를 우선하지만, 이후 FaaS로 확장하기 쉬운 구조를 유지한다.

## 현재 규칙

- UI 컴포넌트는 데이터 조회 방식과 분리한다.
- 정적 데이터는 `src/data/`, 다국어 문구는 `src/i18n/`에 둔다.
- 정적 데이터로 충분하지 않을 때만 server action 또는 route handler를 추가한다.

## 향후 FaaS 후보

- Velog 글 동기화 엔드포인트
- GitHub 활동 캐시 갱신
- 연락 폼 전송
- 프로젝트 메타데이터 갱신

## API 형태

FaaS를 추가할 때는 작은 route handler를 우선한다.

```text
src/app/api/{domain}/route.ts
```

각 route는 입력을 검증하고, 외부 API 호출을 격리하며, UI가 소비할 최소 JSON만 반환해야 한다.
