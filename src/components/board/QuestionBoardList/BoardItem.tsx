import React from 'react';
import {
  BoardItemWrapper,
  StatusWrapper,
  BoardStatus,
  BoardWrapper,
  BoardContent,
  BookMarkWrapper,
  MoreWrapper,
} from './styles';
import More from '../More';
import Profile from '../Profile';
import Status from '../Status';
import Block from '../Block';
import TagList from '../TagList';
import { Post, ToggleKey, ToggleValue } from '../../../types/post';
import usePost from '../../../hooks/usePost';
import BookMarkIcon from '../BookMarkIcon';

interface BoardItemProps {
  post: Post;
  toggleStatus: (id: number, type: ToggleKey, value: ToggleValue) => void;
}

const BoardItem: React.FC<BoardItemProps> = ({ post, toggleStatus }) => {
  const {
    id,
    status,
    viewCount,
    commentCount,
    likeCount,
    nickname,
    timeline,
    title,
    tags,
    content,
    bookmark,
    blind,
    profileImg,
  } = post;
  const { handleBookMarkIconClick, handleMoreClick, handleBlindDataAddClick, handlePostClick, eventStop } = usePost({
    post,
    toggleStatus,
  });

  return (
    <BoardItemWrapper $status={status} onClick={() => handlePostClick(id, blind)} key={status}>
      {blind && <Block onClick={(event) => handleBlindDataAddClick(event, id)} id={id} />}
      <StatusWrapper>
        <BoardStatus $status={status}>{status === 'wait' ? '해결 대기' : '해결 완료'}</BoardStatus>
        <Status viewCount={viewCount} commentCount={commentCount} likeCount={likeCount} />
      </StatusWrapper>
      <BoardWrapper>
        <Profile avatar={profileImg} nickname={nickname} timeline={timeline} />
        <BoardContent>
          <div className="title">{title}</div>
          <TagList tags={tags} />
          <div className="content">{content}</div>
        </BoardContent>
      </BoardWrapper>
      {!blind && (
        <>
          <BookMarkWrapper onClick={(event) => handleBookMarkIconClick(event, id)}>
            <BookMarkIcon isActive={bookmark} />
          </BookMarkWrapper>
          <MoreWrapper onClick={eventStop}>
            <More onClick={(event) => handleMoreClick(event, id)} id={id} />
          </MoreWrapper>
        </>
      )}
    </BoardItemWrapper>
  );
};

export default BoardItem;
