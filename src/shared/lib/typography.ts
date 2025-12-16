type FontWeightKey = 'regular' | 'medium' | 'semiBold' | 'bold';

/**
 * Maps font weight to corresponding Pretendard font family
 * Use this helper in styled components to ensure correct font is applied
 *
 * @param weight - Font weight key (regular, medium, semiBold, bold)
 * @returns The corresponding Pretendard font family name
 *
 * @example
 * ```tsx
 * const Title = styled(Text)`
 *   font-family: ${getFontFamily('bold')};
 * `;
 * ```
 */
export const getFontFamily = (weight: FontWeightKey = 'regular'): string => {
  const fontMap: Record<FontWeightKey, string> = {
    regular: 'Pretendard-Regular',
    medium: 'Pretendard-Medium',
    semiBold: 'Pretendard-SemiBold',
    bold: 'Pretendard-Bold',
  };
  return fontMap[weight];
};
