export interface Post {
  id: number;
  timeline: string;
  title: string;
  content: string;
  tags: string[];
  status: string;
  bookmark: boolean;
  viewCount: number;
  likeCount: number;
  isLiked: boolean;

  commentCount?: number;
  profileImg?: string;
  nickname?: string;
  blind?: boolean;
}

export interface PostData {
  code: number;
  data: Post;
  message: string;
}

export type ToggleKey = 'bookmark' | 'blind' | 'status';

export type ToggleValue = boolean | string;

export type UpdateFunction<T> = (variables: T) => Promise<void>;

export type BookmarkVariables = { postId: number; bookmark: boolean };

export type BlindVariables = { postId: number; blind: boolean };
