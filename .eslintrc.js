module.exports = {
  root: true,
  extends: ['universe/native'], // Expo 공식 설정 사용

  // ★ 아까 에러의 원인! 플러그인을 명시해줘야 규칙을 찾습니다.
  plugins: ['react-native', 'react', 'import'],

  env: {
    node: true,
    jest: true,
  },
  rules: {
    // 1. 콘솔 로그: 개발 중엔 허용 (나중에 배포할 때만 error로 바꾸세요)
    'no-console': 'off',

    // 2. 인라인 스타일: 간단한 건 써도 됨. (너무 길어지면 그때 분리하세요)
    'react-native/no-inline-styles': 'off',

    // 3. 색상 코드 직접 입력: 무조건 허용! (이거 켜면 개발 못합니다)
    'react-native/no-color-literals': 'off',

    // 4. 안 쓰는 스타일: 이건 켜두는 게 좋습니다. (파일 정리용)
    'react-native/no-unused-styles': 'warn',

    // 5. 타입스크립트 변수 미사용: '_'로 시작하는 건 봐줌 (ex: _req)
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

    // 6. import 정렬: 자동 정렬되므로 켜둡니다.
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],

    // ===== 타입 통일 및 명시 강제 규칙 =====

    // 7. interface 대신 type 사용 강제
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],

    // 8. 함수 반환 타입 명시 강제
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      {
        allowExpressions: true, // JSX 표현식, 화살표 함수는 허용
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: true,
        allowDirectConstAssertionInArrowFunctions: true,
      },
    ],

    // 9. export된 함수는 반환 타입 명시 필수
    '@typescript-eslint/explicit-module-boundary-types': 'warn',

    // ===== 타입 추론 불가능한 경우 감지 =====

    // 10. any 타입 명시적 사용 금지 (타입 추론 실패 시 경고)
    '@typescript-eslint/no-explicit-any': 'error',
  },
};
