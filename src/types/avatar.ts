export interface Avatar {
  id: number;
  activityPoint: number;
  content: string;
  nickname: string;
  picture: string;
}

export interface AvatarData {
  code: number;
  data: Avatar;
  message: string;
}
