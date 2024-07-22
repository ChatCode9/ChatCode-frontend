import { Board, BoardListWrapper } from './styles';
import { BoardControlType } from '../../../types/filter';
import usePosts from '../../../hooks/usePosts';
import PaginationRounded from '../Pagination';
import BoardItem from '../QuestionBoardList/BoardItem';
// import More from '../More';

// interface Option {
//   label: string;
//   callback: () => void;
// }
// interface Props {
//   options: Option[];
// }

function FreeBoardList({ filters, setFilters }: BoardControlType) {
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
  // return (
  //   <Container>
  //     {list.map(({ id, nickname, title, tags, viewCount, commentCount, likeCount, bookmark, block }) => (
  //       <BoardItem key={id}>
  //         {block && <Block onClick={handleClick} id={id} />}
  //         <Profile avatar="" nickname={nickname} timeline="" />
  //         <div className="title">
  //           <h1>{title}</h1>
  //           <TagList tags={tags} />
  //         </div>
  //         <div className="timestamp">1시간 전</div>

  //         <div className="status">
  //           <Status viewCount={viewCount} commentCount={commentCount} likeCount={likeCount} />
  //         </div>

  //         <BookMarkIcon isActive={bookmark} />

  //         {!block && (
  //           <MoreWrapper>
  //             {/* <More options={[{ label: '이 글 더 이상 그만보기', callback: () => {} }]} /> */}
  //           </MoreWrapper>
  //         )}
  //       </BoardItem>
  //     ))}
  //   </Container>
  // );
}

export default FreeBoardList;
