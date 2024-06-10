/**
 * Formats a number with commas or converts it to a string with a unit (e.g., 1M).
 *
 * @param viewCount - The number to format.
 * @returns The formatted string.
 *
 * @example
 * formatViewCount(12345); // "12,345"
 * formatViewCount(1234567); // "1.23M"
 *
 * // 예제 컴포넌트
 * const ViewCountDisplay: React.FC<{ viewCount: number }> = ({ viewCount }) => {
 *   return (
 *     <div>
 *       Views: {formatViewCount(viewCount)}
 *     </div>
 *   );
 * };
 * <ViewCountDisplay viewCount={1234567} />
 */

export const formatViewCount = (viewCount: number): string => {
  if (viewCount >= 1_000_000) {
    return `${(viewCount / 1_000_000).toFixed(2)}M`;
  } else if (viewCount >= 1_000) {
    return viewCount.toLocaleString('en-US');
  } else {
    return viewCount.toString();
  }
};