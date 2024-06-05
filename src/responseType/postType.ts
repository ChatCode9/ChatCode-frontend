// types.ts
export interface Post {
  id: string;
  timeline: string;
  profileImg: string;
  nickname: string;
  title: string;
  content: string;
  tags: string[];
  status: string;
  bookmark: boolean;
  blind: boolean;
  viewCount: string;
  commentCount: string;
  likeCount: string;
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
