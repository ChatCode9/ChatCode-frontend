import { Filters } from '../../../types/filter';
import BoardItem from './BoardItem';
import { Board, BoardListWrapper } from './styles';
import BookMarkIcon from '../BookMarkIcon';
import PaginationRounded from '../Pagination';
import usePosts from '../../../hooks/usePosts.ts';
import usePost from '../../../hooks/usePost.ts';

interface Props {
  filters: Filters;
}

function QuestionBoardList({ filters }: Props) {
  const { posts, showLoadingMessage, showNoDataMessage, showPagination, toggleStatus } = usePosts(filters);
  const { handleBookMarkIconClick, handleMoreClick, handleBlindDataAddClick, handlePostClick, eventStop } = usePost({
    posts,
    toggleStatus,
  });

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
          BookMarkIconMemo={BookMarkIcon}
        />
      ))}
      {showPagination && <PaginationRounded />}
    </BoardListWrapper>
  );
}

export default QuestionBoardList;
