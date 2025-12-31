// 예제: 비즈니스 로직 (복잡한 계산, 검증 등)

/**
 * 두 날짜 사이의 차이를 사람이 읽기 쉬운 형식으로 반환
 *
 * @param dateString ISO 8601 형식의 날짜 문자열
 * @returns "방금 전", "3분 전", "2시간 전" 등
 *
 * @example
 * ```ts
 * getTimeAgo('2024-01-01T10:00:00Z'); // "2시간 전"
 * ```
 */
export function getTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return '방금 전';
  if (diffMins < 60) return `${diffMins}분 전`;
  if (diffHours < 24) return `${diffHours}시간 전`;
  if (diffDays < 7) return `${diffDays}일 전`;

  // 7일 이상이면 날짜 표시
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * 택시 요금 계산 (기본 요금 + 거리 요금)
 *
 * @param distanceKm 거리 (km)
 * @param participants 탑승 인원
 * @returns 1인당 예상 요금 (원)
 *
 * @example
 * ```ts
 * calculateFare(5, 3); // 6600 (5km, 3명 탑승)
 * ```
 */
export function calculateFare(distanceKm: number, participants: number): number {
  const BASE_FARE = 4800; // 기본 요금
  const DISTANCE_FARE_PER_KM = 1000; // km당 요금

  const totalFare = BASE_FARE + distanceKm * DISTANCE_FARE_PER_KM;
  const farePerPerson = Math.ceil(totalFare / participants);

  return farePerPerson;
}

/**
 * 제목 유효성 검증
 *
 * @param title 검증할 제목
 * @returns 유효하면 true, 아니면 에러 메시지
 *
 * @example
 * ```ts
 * validateTitle('금정역 → 한세대'); // true
 * validateTitle(''); // '제목을 입력해주세요.'
 * validateTitle('a'); // '제목은 2자 이상이어야 합니다.'
 * ```
 */
export function validateTitle(title: string): true | string {
  if (!title.trim()) {
    return '제목을 입력해주세요.';
  }

  if (title.trim().length < 2) {
    return '제목은 2자 이상이어야 합니다.';
  }

  if (title.length > 50) {
    return '제목은 50자 이하여야 합니다.';
  }

  return true;
}

/**
 * 출발 시간이 현재 시간보다 미래인지 검증
 *
 * @param departureTime ISO 8601 형식의 날짜 문자열
 * @returns 유효하면 true, 아니면 에러 메시지
 *
 * @example
 * ```ts
 * validateDepartureTime('2099-12-31T23:59:59Z'); // true
 * validateDepartureTime('2020-01-01T00:00:00Z'); // '출발 시간은 현재 시간보다 이후여야 합니다.'
 * ```
 */
export function validateDepartureTime(departureTime: string): true | string {
  const departure = new Date(departureTime);
  const now = new Date();

  if (departure <= now) {
    return '출발 시간은 현재 시간보다 이후여야 합니다.';
  }

  return true;
}
