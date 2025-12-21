type SpacingKey = 4 | 8 | 12 | 14 | 16 | 18 | 20 | 24 | 28;

export const spacing = {
  4: '4px',
  8: '8px',
  12: '12px',
  14: '14px',
  16: '16px',
  18: '18px',
  20: '20px',
  24: '24px',
  28: '28px',
} as const satisfies Record<SpacingKey, string>;
