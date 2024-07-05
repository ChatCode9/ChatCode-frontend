import { Container } from './styles';
import CommentInput from '../CommentInput';
import CommentList from '../CommentList';
import { useCommentListQuery } from '../../../hooks/api/useCommentListQuery.ts';

interface Props {
  postId: number;
}

function Comments({ postId }: Props) {
  // 댓글, 대댓글 데이터 호출
  const { commentListData, isLoadingComment, isErrorComment } = useCommentListQuery({ postId });

  if (isLoadingComment) {
    return <div>Loading...</div>;
  }

  if (isErrorComment) {
    return <div>Error...</div>;
  }

  console.log(commentListData.data);
  console.log(commentListData.data.length);

  return (
    <Container>
      <div className="inner">
        <h2 className="title">
          댓글
          <span className="count">{commentListData.data.length}</span>
        </h2>
        <CommentInput type="textarea" />
        <CommentList comments={commentListData.data} />
      </div>
    </Container>
  );
}

export default Comments;
