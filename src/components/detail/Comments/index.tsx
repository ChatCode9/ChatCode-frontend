import { useState } from 'react';
import { Container } from './styles';
import CommentInput from '../CommentInput';
import CommentList from '../CommentList';
import { useQuery } from '@tanstack/react-query';
import { getCommentList } from '../../../services/comment.ts';

function generateData() {
  const result = [];

  for (let i = 0; i < 300; i++) {
    result.push({
      id: i,
      avatar: 'https://placehold.co/30',
      writer: '가나다라마바사' + i,
      timestamp: '1시간전',
      likeCount: 100,
      dislikeCount: 50,
      comment: '123123123123123123'.repeat(20),
    });
  }

  return result;
}

interface Props {
  postId : number;
}

function Comments({postId} : Props) {
  const [data] = useState(() => generateData());

  const { data : commentListData, isLoading: isLoadingComment, isError: isErrorComment} = useQuery({
    queryKey : ["commentListData", postId],
    queryFn: () => getCommentList(postId),
  });

  if (isLoadingComment) {
    return <div>Loading...</div>;
  }

  if (isErrorComment) {
    return <div>Error...</div>;
  }

  console.log(commentListData.data)
  console.log(commentListData.data.length)

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
