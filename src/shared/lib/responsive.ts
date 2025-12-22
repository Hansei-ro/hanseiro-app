import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// 피그마 디자인 프레임의 기준 너비/높이
// 일반적으로 iPhone X/11/12/13 mini (375) 또는 iPhone 14/15 Pro (393)를 사용합니다.
// 현재 디자인이 393 기준이라면 393으로, 375 기준이라면 375로 설정하세요.
const GUIDELINE_BASE_WIDTH = 393;
const GUIDELINE_BASE_HEIGHT = 812;

/**
 * 가로 길이 기준 스케일링
 * 예: paddingHorizontal, width, fontSize 등
 */
export const scale = (size: number) => (width / GUIDELINE_BASE_WIDTH) * size;

/**
 * 세로 길이 기준 스케일링
 * 예: paddingVertical, height, marginBottom 등
 */
export const verticalScale = (size: number) => (height / GUIDELINE_BASE_HEIGHT) * size;

/**
 * 적당한 스케일링 (추천)
 *
 * scale() 함수는 화면이 커지면 요소도 정비례해서 계속 커집니다.
 * moderateScale()은 커지는 비율을 제어할 수 있어서(factor),
 * 너무 비대해지는 것을 막아주며 자연스러운 크기를 유지합니다.
 *
 * 사용 예: moderateScale(16) -> 16px을 기준으로 화면 크기에 따라 적절히 조절
 */
export const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;
