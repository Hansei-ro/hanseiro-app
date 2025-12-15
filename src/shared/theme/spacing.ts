type SpacingKey = 4 | 8 | 12 | 14 | 16 | 18 | 20 | 24 | 28;

export const spacing = {
  4: 4,
  8: 8,
  12: 12,
  14: 14,
  16: 16,
  18: 18,
  20: 20,
  24: 24,
  28: 28,
} as const satisfies Record<SpacingKey, number>;
