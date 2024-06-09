import React from 'react';
import { Post } from '../../../responseType/postType';
import {
  BoardItemWrapper,
  StatusWrapper,
  BoardStatus,
  BoardWrapper,
  BoardContent,
  BookMarkWrapper,
  MoreWrapper
} from './styles';
import More from '../More';
import Profile from '../Profile';
import Status from '../Status';
import Block from '../Block';
import TagList from '../TagList';

interface BoardItemProps {
  post: Post;
  handlePostClick: (id: number, blind: boolean) => void;
  handleBookMarkIconClick: (event: React.MouseEvent<HTMLDivElement>, id: number) => void;
  handleMoreClick: (event: React.MouseEvent<HTMLButtonElement>, id: number) => void;
  handleBlindDataAddClick: (event: React.MouseEvent<HTMLButtonElement>, id: number) => void;
  eventStop: (event: React.MouseEvent<HTMLDivElement>) => void;
  BookMarkIconMemo: React.FC<{ isActive: boolean }>;
  showModal : (event: React.MouseEvent<HTMLDivElement>, status: string, id: number) => void;
}

const BoardItem: React.FC<BoardItemProps> = ({
                                               post,
                                               handlePostClick,
                                               handleBookMarkIconClick,
                                               handleMoreClick,
                                               handleBlindDataAddClick,
                                               eventStop,
                                               BookMarkIconMemo,
                                               showModal
                                             }) => {
  const { id, status, viewCount, commentCount, likeCount, nickname, timeline, title, tags, content, bookmark, blind } = post;

  return (
    <BoardItemWrapper $status={status} onClick={() => handlePostClick(id, blind)} key={status}>
      {blind && <Block onClick={(event) => handleBlindDataAddClick(event, id)} id={id}/>}
      <StatusWrapper>
        <BoardStatus $status={status} onClick={(event) => showModal(event, status, id)}>
          {status === 'wait' ? '해결 대기' : '해결 완료'}
        </BoardStatus>
        <Status viewCount={viewCount} commentCount={commentCount} likeCount={likeCount} />
      </StatusWrapper>
      <BoardWrapper>
        <Profile avatar="" nickname={nickname} timeline={timeline} />
        <BoardContent>
          <div className="title">{title}</div>
          <TagList tags={tags} />
          <div className="content">{content}</div>
        </BoardContent>
      </BoardWrapper>
      {!blind && (
        <BookMarkWrapper onClick={(event) => handleBookMarkIconClick(event, id)}>
          <BookMarkIconMemo isActive={bookmark} />
        </BookMarkWrapper>
      )}
      {!blind && (
        <MoreWrapper onClick={eventStop}>
          <More onClick={(event) => handleMoreClick(event, id)} id={id} />
        </MoreWrapper>
      )}
    </BoardItemWrapper>
  );
};

export default BoardItem;
