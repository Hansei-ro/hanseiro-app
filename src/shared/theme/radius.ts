type RadiusKey = 12 | 24;

export const radius = {
  12: 12,
  24: 24,
} as const satisfies Record<RadiusKey, number>;
