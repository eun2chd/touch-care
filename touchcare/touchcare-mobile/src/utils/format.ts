/**
 * 유틸리티 함수
 */

/**
 * 날짜 포맷팅
 */
export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * 시간 포맷팅
 */
export const formatTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * 숫자 포맷팅 (천 단위 구분)
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString('ko-KR');
};
