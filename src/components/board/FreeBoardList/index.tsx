import styled from 'styled-components';
import Profile from '../Profile';
import TagList from '../TagList';
import Status from '../Status';
import BookMarkIcon from '../BookMarkIcon';
import Block from '../Block';
import More from '../More';

const list = [
  {
    id: 1,
    nickname: '가나다라마바사',
    title: '~~인데 맞음?',
    tags: ['coding', 'react', 'spring', 'html', 'vscode', 'css', 'js', 'study'],
    viewCount: 20,
    commentCount: 20,
    likeCount: 20,
    bookmark: false,
    block: false,
  },
  {
    id: 2,
    nickname: '가나다라마바사',
    title: '~~인데 맞음?',
    tags: ['coding', 'react', 'spring', 'html', 'vscode', 'css', 'js', 'study'],
    viewCount: 20,
    commentCount: 20,
    likeCount: 20,
    bookmark: true,
    block: true,
  },
];

function FreeBoardList() {
  return (
    <Container>
      {list.map(({ id, nickname, title, tags, viewCount, commentCount, likeCount, bookmark, block }) => (
        <BoardItem key={id}>
          {block && <Block />}
          <Profile avatar="" nickname={nickname} />
          <div className="title">
            <h1>{title}</h1>
            <TagList tags={tags} />
          </div>
          <div className="timestamp">1시간 전</div>

          <div className="status">
            <Status viewCount={viewCount} commentCount={commentCount} likeCount={likeCount} />
          </div>

          <BookMarkIcon isActive={bookmark} />

          {!block && (
            <MoreWrapper>
              <More options={[{ label: '이 글 더 이상 그만보기', callback: () => {} }]} />
            </MoreWrapper>
          )}
        </BoardItem>
      ))}
    </Container>
  );
}

export default FreeBoardList;

const Container = styled.ul`
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
`;

const BoardItem = styled.li`
  padding: 25px 10px;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc8;
  display: flex;
  align-items: center;
  position: relative;

  & + li {
    border-top: 1px solid #5d5a88;
  }

  .title {
    margin-left: 50px;
    width: 550px;

    h1 {
      font-size: 18px;
      font-weight: 700;
    }
  }

  .timestamp {
    width: 250px;
  }

  .status {
    margin-right: 60px;
  }
`;

const MoreWrapper = styled.div`
  position: absolute;
  right: -30px;
  top: 0px;
`;
