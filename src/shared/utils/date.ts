import { formatDistanceToNow, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

/**
 * ISO 8601 날짜 문자열을 "방금 전", "5분 전" 같은 상대 시간으로 변환
 *
 * @param isoString - ISO 8601 형식의 날짜 문자열
 * @returns 한글 상대 시간 문자열 ("방금 전", "5분 전" 등)
 *
 * @example
 * formatRelativeTime('2024-11-24T10:00:00Z') // "5분 전"
 */
export const formatRelativeTime = (isoString: string | null | undefined): string => {
  if (!isoString) return '';

  try {
    return formatDistanceToNow(parseISO(isoString), {
      addSuffix: true,
      locale: ko,
    });
  } catch {
    return '';
  }
};
