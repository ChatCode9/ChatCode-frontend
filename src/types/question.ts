import { PageInfo } from './page';
import { Post } from './post';

export interface Question {
  code: number;
  data: Post[];
  message: string;
  pageInfo: PageInfo;
}
