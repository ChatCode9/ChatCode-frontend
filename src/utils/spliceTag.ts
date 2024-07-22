// 태그를 띄어쓰기를 기준으로 배열로 바꾸는 함수

export const spliceTag = (tags: string[]): string[] => {
  return tags[0].split(' ');
};
