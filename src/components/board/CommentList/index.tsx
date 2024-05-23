import { Wrapper } from './styles';
import CommentItem from '../CommentItem';

export interface ReplyType {
  id: number;
  avatar: string;
  username: string;
  timestamp: string;
  likeCount: number;
  disLikeCount: number;
  comment: string;
}

export interface CommentType {
  id: number;
  avatar: string;
  username: string;
  timestamp: string;
  likeCount: number;
  disLikeCount: number;
  comment: string;
  reply: ReplyType[];
}

interface Props {
  comments: CommentType[];
}

function CommentList({ comments }: Props) {
  return (
    <Wrapper>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <CommentItem {...comment} />
          </li>
        ))}
      </ul>
    </Wrapper>
  );
}

export default CommentList;
