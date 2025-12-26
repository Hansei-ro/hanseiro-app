import { defineConfig } from 'orval';

/**
 * Orval 설정 파일
 *
 * 사용법:
 * 1. 백엔드에서 OpenAPI 스펙(openapi.yaml 또는 JSON)을 받아서 프로젝트 루트에 저장
 * 2. `yarn api:generate` 실행
 * 3. src/api/generated/ 에 타입, API 함수, React Query 훅이 생성됨
 *
 * @see https://orval.dev/reference/configuration/overview
 */
export default defineConfig({
  hanseiroApi: {
    // 📌 백엔드 OpenAPI 스펙 위치
    // TODO: 백엔드에서 OpenAPI URL 제공 시 아래 URL 변경
    input: {
      target: 'http://localhost:8000/openapi.json', // 백엔드 OpenAPI URL로 변경
    },

    // 📌 생성될 코드 설정
    output: {
      // 생성 모드: 태그별로 파일 분리
      mode: 'tags-split',

      // 생성 위치
      target: './src/api/generated',

      // React Query 훅 생성
      client: 'react-query',

      // HTTP 클라이언트
      httpClient: 'axios',

      // 스키마(타입) 별도 폴더에 생성
      schemas: './src/api/generated/model',

      // 기본 axios 인스턴스 대신 커스텀 인스턴스 사용
      override: {
        mutator: {
          path: './src/shared/lib/axios.ts',
          name: 'customInstance',
        },
        // React Query 옵션 커스터마이징
        query: {
          useQuery: true,
          useMutation: true,
          // React Query v5 사용
          version: 5,
        },
      },

      // MSW Mock 핸들러 생성 (선택사항)
      // TODO: MSW 사용 시 주석 해제
      // mock: true,
    },
  },
});
