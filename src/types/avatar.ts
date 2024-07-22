export interface AvatarName {
  name?: string;
}

export interface Avatars {
  id: number;
  activityPoint: number;
  nickname: string;
  picture: string;
}

export interface Avatar extends Avatars {
  content: string;
}

export interface AvatarData {
  code: number;
  data: Avatar;
  message: string;
}

export interface AvatarsData {
  code: number;
  data: Avatars[];
  message: string;
}
