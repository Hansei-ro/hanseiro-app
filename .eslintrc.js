module.exports = {
  root: true,
  extends: ['universe/native'],

  plugins: ['react-native', 'react', 'react-hooks', 'import'],

  env: {
    node: true,
    jest: true,
  },
  rules: {
    // ===== 개발 편의성 =====

    // 1. 콘솔 로그: 개발 중 허용 (배포 시 제거 권장)
    'no-console': 'off',

    // 2. 인라인 스타일: Emotion 사용으로 불필요
    'react-native/no-inline-styles': 'off',

    // 3. 색상 코드: theme 시스템 있으므로 허용
    'react-native/no-color-literals': 'off',

    // 4. 안 쓰는 스타일: 코드 정리용
    'react-native/no-unused-styles': 'warn',

    // ===== TypeScript 타입 안전성 =====

    // 5. 미사용 변수: '_'로 시작하면 허용
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

    // 6. any 타입 금지 (타입 안전성 핵심)
    '@typescript-eslint/no-explicit-any': 'error',

    // 7. type vs interface: 자유롭게 (컨벤션 문서 참고)
    '@typescript-eslint/consistent-type-definitions': 'off',

    // 8. 함수 반환 타입: JSX는 자동 추론
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    // 9. Promise 처리 권장 (타입 정보 필요하므로 주석)
    // '@typescript-eslint/no-floating-promises': 'error',
    // '@typescript-eslint/no-misused-promises': 'error',

    // ===== React 규칙 =====

    // 10. React Hooks 규칙 (필수)
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // ===== 코드 품질 =====

    // 11. === 사용 강제 (== 금지, null 체크는 예외)
    eqeqeq: ['error', 'always', { null: 'ignore' }],

    // 12. import 정렬
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
  },
};
