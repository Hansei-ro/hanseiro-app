type FontSizeKey = 'xs' | 's' | 'm' | 'l' | 'titleM' | 'titleL';
type FontWeightKey = 'regular' | 'medium' | 'semiBold' | 'bold';

export const typography = {
  fontSize: {
    xs: '12px', // Text XS
    s: '14px', // Text S
    m: '16px', // Text M
    l: '18px', // Text L
    titleM: '20px', // Title-M
    titleL: '24px', // Title-L
  } satisfies Record<FontSizeKey, string>,
  fontWeight: {
    regular: '400', // Regular
    medium: '500', // Medium
    semiBold: '600', // SemiBold
    bold: '700', // Bold
  } satisfies Record<FontWeightKey, string>,
} as const;
