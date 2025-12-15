type FontSizeKey = 'xs' | 's' | 'm' | 'l' | 'titleM' | 'titleL';
type FontWeightKey = 'regular' | 'medium' | 'semiBold' | 'bold';

export const typography = {
  fontSize: {
    xs: 12, // Text XS
    s: 14, // Text S
    m: 16, // Text M
    l: 18, // Text L
    titleM: 20, // Title-M
    titleL: 24, // Title-L
  } satisfies Record<FontSizeKey, number>,
  fontWeight: {
    regular: '400', // Regular
    medium: '500', // Medium
    semiBold: '600', // SemiBold
    bold: '700', // Bold
  } satisfies Record<FontWeightKey, string>,
} as const;
