import { Header, Wrapper } from './styles';
import Divider from '../Divider';
import CommentList from '../CommentList';
import CommentInput from '../CommentInput';

const data = [
  {
    id: 1,
    avatar: 'https://placehold.co/30',
    username: '가나다라마바사',
    timestamp: '1시간전',
    likeCount: 0,
    disLikeCount: 0,
    comment: '가나다라마바사'.repeat(20),
    reply: [
      {
        id: 1,
        avatar: 'https://placehold.co/30',
        username: '가나다라마바사',
        timestamp: '1시간전',
        likeCount: 0,
        disLikeCount: 0,
        comment: '가나다라마바사'.repeat(20),
      },
    ],
  },
];

function Comments() {
  return (
    <Wrapper>
      <Divider />

      <div className="inner">
        <Header>
          <div className="title">
            <h2>댓글</h2>
            <div className="count">10</div>
          </div>
          <CommentInput type="textarea" />
        </Header>

        <CommentList comments={data} />
      </div>
    </Wrapper>
  );
}

export default Comments;
