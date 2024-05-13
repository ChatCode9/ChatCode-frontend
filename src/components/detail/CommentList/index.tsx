import { Container } from './styles';
import { CommentType } from '../../../types/comment';
import CommentItem from '../CommentItem';

interface Props {
  comments: CommentType[];
}

function CommentList({ comments }: Props) {
  return (
    <Container>
      <ul className="comment-list">
        {comments.map((comment) => (
          <CommentItem {...comment} />
        ))}
      </ul>
    </Container>
  );
}

export default CommentList;
