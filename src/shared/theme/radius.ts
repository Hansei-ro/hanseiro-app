export type RadiusKey = 12 | 24;

export const radius: Record<RadiusKey, string> = {
  12: '12px',
  24: '24px',
} as const;
