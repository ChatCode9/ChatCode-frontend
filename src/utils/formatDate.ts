/**
 * Formats a timestamp into a string with the format "yy.MM.dd. HH:mm".
 *
 * @param {string | number | Date} timestamp - The input timestamp to convert.
 * @returns {string} - The formatted date string.
 *
 * @throws {Error} - Throws an error if the timestamp is invalid.
 *
 * @example
 * formatDate("2023-06-09T12:34:56Z"); // "23.06.09. 12:34"
 * formatDate(1654773296000); // "23.06.09. 12:34"
 * formatDate(new Date()); // current date and time in the specified format
 */

export const formatDate = (timestamp: string | number | Date): string => {
  const date = new Date(timestamp);

  // 유효한 날짜인지 확인
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date");
  }

  const pad = (n: number): string => (n < 10 ? '0' + n : n.toString());

  const year = date.getFullYear().toString().slice(-2); // 연도 두 자리
  const month = pad(date.getMonth() + 1); // 월
  const day = pad(date.getDate()); // 일
  const hours = pad(date.getHours()); // 시간
  const minutes = pad(date.getMinutes()); // 분

  return `${year}.${month}.${day}. ${hours}:${minutes}`;
};
