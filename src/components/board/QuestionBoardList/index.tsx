import { BoardControlType } from '../../../types/filter';
import BoardItem from './BoardItem';
import { Board, BoardListWrapper } from './styles';
import PaginationRounded from '../Pagination';
import usePosts from '../../../hooks/usePosts.ts';

function QuestionBoardList({ filters, setFilters }: BoardControlType) {
  const { posts, showLoadingMessage, showNoDataMessage, showPagination, toggleStatus, pagesCount } = usePosts(filters);

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
        <BoardItem key={post.id} post={post} toggleStatus={toggleStatus} />
      ))}
      {showPagination && <PaginationRounded pagesCount={pagesCount} setFilters={setFilters} />}
    </BoardListWrapper>
  );
}

export default QuestionBoardList;
