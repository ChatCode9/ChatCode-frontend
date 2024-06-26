/**
 * 시간을 "1시간 전", "1일 전" 등으로 변환하는 함수
 *
 * @param timestamp - The input timestamp to convert.
 * Can be a string, number, or Date object.
 * @returns The relative time string.
 *
 * @throws Error - Throws an error if the timestamp is invalid.
 *
 * @example
 * timeDifference("2023-06-09T12:34:56Z"); // "1일 전"
 * timeDifference(1654773296000); // "1시간 전"
 * timeDifference(new Date()); // "방금 전"
 *
 * import CustomTransparentCard from './timeDifferences';
 * <CustomTransparentCard timestamp="2023-06-10T11:34:56Z" />
 */

export const timeDifference = (timestamp: string | number | Date) => {
  const now = new Date();
  const time = new Date(timestamp);

  // 유효한 Date 객체인지 확인
  if (isNaN(time.getTime())) {
    throw new Error("Invalid date");
  }

  const diffInSeconds = Math.floor((now.getTime() - time.getTime()) / 1000);

  const intervals = [
    { label: '년', seconds: 31536000 },
    { label: '달', seconds: 2592000 },
    { label: '주', seconds: 604800 },
    { label: '일', seconds: 86400 },
    { label: '시간', seconds: 3600 },
    { label: '분', seconds: 60 },
  ];

  for (let i = 0; i < intervals.length; i++) {
    const interval = intervals[i];
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count > 0) {
      return `${count} ${interval.label} 전`;
    }
  }

  return '방금 전';
};