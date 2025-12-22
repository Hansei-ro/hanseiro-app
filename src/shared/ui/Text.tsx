import styled from '@emotion/native';
import React from 'react';
import { Text as RNText, TextProps as RNTextProps, TextStyle } from 'react-native';

import { theme } from '../theme';
import { FontSizeKey, FontWeightKey, typography } from '../theme/typography';

export interface TextProps extends RNTextProps {
  /**
   * 폰트 크기 변형 (variant).
   * @default 'm'
   */
  variant?: FontSizeKey;
  /**
   * 폰트 굵기 변형 (weight). 자동으로 올바른 Pretendard 폰트 패밀리에 매핑됩니다.
   * @default 'regular'
   */
  weight?: FontWeightKey;
  /**
   * 텍스트 색상. 테마 색상 키 또는 유효한 색상 문자열을 사용할 수 있습니다.
   */
  color?: string;
  /**
   * 텍스트 정렬.
   */
  align?: TextStyle['textAlign'];
  /**
   * 커스텀 라인 높이. 지정하지 않으면 variant에 따른 기본값이 사용됩니다.
   */
  lineHeight?: number;
}

/**
 * 굵기(weight)에 따라 올바른 폰트 패밀리 이름을 반환합니다.
 * 폰트가 'Pretendard-Regular', 'Pretendard-Bold' 등으로 로드되었다고 가정합니다.
 */
const getFontFamily = (weight: FontWeightKey): string => {
  const families: Record<FontWeightKey, string> = {
    regular: 'Pretendard-Regular',
    medium: 'Pretendard-Medium',
    semiBold: 'Pretendard-SemiBold',
    bold: 'Pretendard-Bold',
  };
  return families[weight];
};

const StyledText = styled(RNText)<TextProps>(({
  variant = 'm',
  weight = 'regular',
  color,
  align,
  lineHeight,
}) => {
  // 기본 스타일
  const baseStyle: TextStyle = {
    fontFamily: getFontFamily(weight),
    fontSize: parseInt(typography.fontSize[variant], 10),
    lineHeight,
    color: color || theme.colors.primary.black, // 지정되지 않은 경우 기본 텍스트 색상 사용
    textAlign: align,
    includeFontPadding: false, // Android 전용: 추가 패딩 제거
  };

  return baseStyle;
});

/**
 * Pretendard 폰트를 강제하고 Android 폰트 패딩을 처리하는 전역 Text 컴포넌트입니다.
 */
export const Text = React.forwardRef<RNText, TextProps>((props, ref) => {
  return <StyledText ref={ref} {...props} />;
});
