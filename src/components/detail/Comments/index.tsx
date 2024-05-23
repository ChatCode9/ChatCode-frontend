import { useState } from 'react';
import { Container } from './styles';
import CommentInput from '../CommentInput';
import CommentList from '../CommentList';

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

function Comments() {
  const [data] = useState(() => generateData());

  return (
    <Container>
      <div className="inner">
        <h2 className="title">
          댓글
          <span className="count">{data.length}</span>
        </h2>
        <CommentInput type="textarea" />
        <CommentList comments={data} />
      </div>
    </Container>
  );
}

export default Comments;
