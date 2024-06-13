// types.ts
export interface Post {
  id: number;
  timeline: string;
  profileImg: string;
  nickname: string;
  title: string;
  content: string;
  tags: string[];
  status: string;
  bookmark: boolean;
  blind: boolean;
  viewCount: number;
  commentCount: number;
  likeCount: number;
}

export interface PageInfo {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface Question {
  code: number;
  data: Post[];
  message: string;
  pageInfo: PageInfo;
}
