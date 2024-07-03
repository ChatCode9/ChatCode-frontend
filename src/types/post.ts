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
