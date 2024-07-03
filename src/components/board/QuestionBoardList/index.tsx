import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { Filters } from '../../../types/filter';
import BoardItem from './BoardItem';
import { Board, BoardListWrapper } from './styles';
import BookMarkIcon from '../BookMarkIcon';
import PaginationRounded from '../Pagination';
import usePosts from '../../../hooks/usePosts.ts';

interface Props {
  filters: Filters;
}

function QuestionBoardList({ filters }: Props) {
  const navigate = useNavigate();
  const { posts, showLoadingMessage, showNoDataMessage, showPagination, toggleStatus } = usePosts(filters);
  const BookMarkIconMemo = React.memo(BookMarkIcon);

  // 게시글 북마크 하고자 할 때
  const handleBookMarkIconClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>, id: number) => {
      event.stopPropagation();
      toggleStatus(id, 'bookmark', !posts.find((post) => post.id === id)?.bookmark);
    },
    [toggleStatus, posts],
  );

  // 블라인드 상태 토글하고자 할 때
  const handleMoreClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
      event.stopPropagation();
      toggleStatus(id, 'blind', !posts.find((post) => post.id === id)?.blind);
    },
    [toggleStatus, posts],
  );

  // 중요!!!
  // handleMoreClick 와 같은 기능이므로 삭제될 예정
  const handleBlindDataAddClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
      event.stopPropagation();
      toggleStatus(id, 'blind', !posts.find((post) => post.id === id)?.blind);
    },
    [toggleStatus, posts],
  );

  // 게시글 클릭 할 때
  const handlePostClick = useCallback(
    (id: number, blind: boolean) => {
      if (!blind) {
        navigate(`/posts/${id}`);
      }
    },
    [navigate],
  );

  // More 컴포넌트 클릭시 다른 곳 컴포넌트로 이벤트 퍼지는거 막기
  const eventStop = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  }, []);

  if (showLoadingMessage) {
    return (
      <BoardListWrapper>
        <Board>데이터 로딩중...</Board>
      </BoardListWrapper>
    );
  }

  if (showNoDataMessage) {
    return (
      <BoardListWrapper>
        <Board>데이터 0건</Board>
      </BoardListWrapper>
    );
  }

  return (
    <BoardListWrapper>
      {posts.map((post) => (
        <BoardItem
          key={post.id}
          post={post}
          handlePostClick={handlePostClick}
          handleBookMarkIconClick={handleBookMarkIconClick}
          handleMoreClick={handleMoreClick}
          handleBlindDataAddClick={handleBlindDataAddClick}
          eventStop={eventStop}
          BookMarkIconMemo={BookMarkIconMemo}
        />
      ))}
      {showPagination && <PaginationRounded />}
    </BoardListWrapper>
  );
}

export default QuestionBoardList;
