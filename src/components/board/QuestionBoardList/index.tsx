import styled, { css } from 'styled-components';

import More from '../More';
import Profile from '../Profile';
import Status from '../Status';
import Block from '../Block';
import BookMarkIcon from '../BookMarkIcon';
import TagList from '../TagList';
import { useNavigate } from 'react-router-dom';
// import initialData from '../../../data/Question_Dummy_data.json';
import React, { useCallback, useEffect, useState } from 'react';
import { PostsQuery } from '../../../services/post.ts';
import { Post } from '../../../responseType/postType.ts';

type Filters = {
  search: string;
  categories: string;
  sortby: string;
  status: string[];
  pageInfo: {
    page: number;
    size: number;
  };
};

interface Props {
  filters: Filters;
}

function QuestionBoardList({ filters }: Props) {
  const navigate = useNavigate();
  // 백엔드 없이 초기 데이터 있을때 사용 (퍼블리싱 용도)
  // const [posts, setPosts] = useState(initialData.data);
  const [posts, setPosts] = useState<Post[]>([]);
  const BookMarkIconMemo = React.memo(BookMarkIcon);

  // 게시글 클릭 할 때
  const handlePostClick = (id: string) => {
    navigate(`/posts/${id}`);
  };

  // 게시글 북마크 하고자 할 때
  const handleBookMarkIconClick = useCallback<(event: React.MouseEvent<HTMLDivElement>, id: string) => void>(
    (event, id) => {
      event.stopPropagation();
      // 로그인 유저가 해당 게시글 북마크 로직 처리

      // 성공시 setPosts 실행
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === id ? { ...post, bookmark: !post.bookmark } : post
        )
      );
      // 실패시 에러 관련 메시지 출력
    },
    [setPosts]
  );

  // 게시글 블라인드 하고자 할 때
  const handleMoreClick = useCallback<(event: React.MouseEvent<HTMLDivElement>, id: string) => void>(
    (event, id) => {
      event.stopPropagation();
      // 로그인 유저가 해당 게시글 블라인드 로직 처리

      // 실패시 에러 관련 메시지 출력
    },
    []
  );

  // 블라인드 글을 해체 하고자 할 때
  const handleBlindDataAddClick = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    event.stopPropagation();
    // 클릭 이벤트 처리 로직
    console.log('Button clicked / id : '+id);
    // 클릭한 블라인드 글 데이터 조회
  };

  // 데이터 호출
  const { data, isLoading, isError, error  } = PostsQuery();

  // 데이터가 변경될 때 posts 상태 업데이트
  useEffect(() => {
    if (data?.data) {
      // console.log("data 상태 변경:");
      // console.log(data.data);
      setPosts(data.data);
    }
  }, [data]);

  // posts 상태가 변경될 때마다 로그 출력
  useEffect(() => {
    // console.log("posts 상태 변경:");
    // console.log(posts);
  }, [posts]);

  // 로딩, 에러, 데이터 없음 처리
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;
  if (!data?.data || data.data.length === 0) return <div>No data available</div>;

  // console.log(data.code);
  // console.log(data.data);
  // console.log(data.message);
  // console.log(data.pageInfo);


  return (
    <BoardListWrapper>
      {posts.map(
        ({
           id,
           status,
           viewCount,
           commentCount,
           likeCount,
           nickname,
           timeline,
           profileImg,
           title,
           tags,
           content,
           bookmark,
           blind,
         }) => (
          <BoardItem key={id} $status={status} onClick={() => handlePostClick(id)}>
            {blind && <Block onClick={handleBlindDataAddClick} id={id} />}
            <StatusWrapper>
              <BoardStatus $status={status}>{status === 'wait' ? '해결 대기' : '해결 완료'}</BoardStatus>
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
              <MoreWrapper onClick={(event) => handleMoreClick(event, id)}>
                <More options={[{
                  label: '이 글 더 이상 그만보기', callback: () => {
                  },
                }]} />
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
    border: 1px solid #BCBACD;
    border-radius: 10px;
    margin-top: 5px;
    ${(props) =>
            props.$status === 'finish' &&
            css`
                background-color: #dfdee7;
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