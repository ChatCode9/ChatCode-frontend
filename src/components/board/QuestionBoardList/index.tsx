import styled, { css } from 'styled-components';

import More from '../More';
import Profile from '../Profile';
import Status from '../Status';
import Block from '../Block';
import BookMarkIcon from '../BookMarkIcon';
import TagList from '../TagList';

const questions = [
  {
    id: 1,
    status: 'wait',
    viewCount: 20,
    commentCount: 20,
    likeCount: 20,
    nickname: '가나다라마바사',
    title: '코딩 문제 중 이게 어떻게 어쩌고 저쩌고 하는지 잘 모르겠는데 봐주세요 어쩌고저쩌고',
    tags: ['coding', 'react', 'spring', 'html', 'vscode', 'css', 'js', 'study'],
    bookmark: false,
    block: false,
    content:
      '문제중에서 이거는 어쩌고 저거는 저쩌고 어쩌고 저쩌고 뭐라고 하는데 잘 모르겠고 이것도 해보고 저것도 해보고 이렇게도 해보고 저렇게도 해봤는데 안되고 오류가 어디서 나는지 잘 모르겠으며 이거는 이거아닌지 저거는 저게 맞는데 아니라고 나오고 왜 이렇게 뜨는지도 잘 모르겠고 어떻게 하면 이게 요렇게asdasdasdasdadasdadfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdf',
  },
  {
    id: 2,
    status: 'finish',
    viewCount: 20,
    commentCount: 20,
    likeCount: 20,
    nickname: '가나다라마바사',
    title: '코딩 문제 중 이게 어떻게 어쩌고 저쩌고 하는지 잘 모르겠는데 봐주세요 어쩌고저쩌고',
    tags: ['coding', 'react', 'spring', 'html', 'vscode', 'css', 'js', 'study'],
    bookmark: true,
    block: true,
    content:
      '문제중에서 이거는 어쩌고 저거는 저쩌고 어쩌고 저쩌고 뭐라고 하는데 잘 모르겠고 이것도 해보고 저것도 해보고 이렇게도 해보고 저렇게도 해봤는데 안되고 오류가 어디서 나는지 잘 모르겠으며 이거는 이거아닌지 저거는 저게 맞는데 아니라고 나오고 왜 이렇게 뜨는지도 잘 모르겠고 어떻게 하면 이게 요렇게asdasdasdasdadasda',
  },
];

function QuestionBoardList() {
  return (
    <BoardListWrapper>
      {questions.map(
        ({ id, status, viewCount, commentCount, likeCount, nickname, title, tags, content, bookmark, block }) => (
          <BoardItem key={id} $status={status}>
            {block && <Block />}
            <StatusWrapper>
              <BoardStatus $status={status}>{status === 'wait' ? '해결 대기' : '해결 완료'}</BoardStatus>
              <Status viewCount={viewCount} commentCount={commentCount} likeCount={likeCount} />
            </StatusWrapper>

            <BoardWrapper>
              <Profile avatar="" nickname={nickname} timeline="1시간 전" />
              <BoardContent>
                <div className="title">{title}</div>
                <TagList tags={tags} />
                <div className="content">{content}</div>
              </BoardContent>
            </BoardWrapper>
            <BookMarkWrapper>
              <BookMarkIcon isActive={bookmark} />
            </BookMarkWrapper>
            {!block && (
              <MoreWrapper>
                <More options={[{ label: '이 글 더 이상 그만보기', callback: () => {} }]} />
              </MoreWrapper>
            )}
          </BoardItem>
        ),
      )}
    </BoardListWrapper>
  );
}

export default QuestionBoardList;

const BoardListWrapper = styled.ul`
  padding-bottom: 50px;
`;

const BoardItem = styled.li<{ $status: string }>`
  position: relative;
  display: flex;
  border: 1px solid #000;

  ${(props) =>
    props.$status === 'finish' &&
    css`
      /* background-color: #5d5a88; */
    `}
`;

const StatusWrapper = styled.div`
  padding: 30px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const BoardStatus = styled.div<{ $status: string }>`
  width: 87px;
  height: 44px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 2px;
  font-weight: 700;
  font-size: 14px;

  color: ${(props) => (props.$status === 'wait' ? '#5d5a88' : '#fff')};
  border: ${(props) => (props.$status === 'wait' ? '2px solid #8d8ba7' : 'none')};
  background-color: ${(props) => (props.$status === 'wait' ? 'transparnt' : '#5D5A88')};
`;

const BoardWrapper = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
`;

const BoardContent = styled.div`
  margin-top: 20px;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .content {
    max-width: 700px;
    margin-top: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* 라인수 */
    -webkit-box-orient: vertical;
    word-wrap: break-word;
    line-height: 1.2em;
    height: 3.6em;
  }
`;

const BookMarkWrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 5px;
  font-size: 30px;
  cursor: pointer;
`;

const MoreWrapper = styled.div`
  position: absolute;
  right: -30px;
  top: 0px;
`;
