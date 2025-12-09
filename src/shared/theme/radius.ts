type RadiusKey = 12 | 24;

export const radius = {
  12: '12px',
  24: '24px',
} as const satisfies Record<RadiusKey, string>;
