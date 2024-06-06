import styled, { css } from 'styled-components';

import More from '../More';
import Profile from '../Profile';
import Status from '../Status';
import Block from '../Block';
import BookMarkIcon from '../BookMarkIcon';
import TagList from '../TagList';
import { useNavigate } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';
import { PostsQuery, updateBlind, updateBookmark } from '../../../services/post.ts';
import { Post } from '../../../responseType/postType.ts';
import { Filters } from '../../../requestType/postType.ts';
import { useMutation } from '@tanstack/react-query';

interface Props {
  filters: Filters;
}

function QuestionBoardList({ filters }: Props) {
  const navigate = useNavigate();
  // 백엔드 없이 초기 데이터 있을때 사용 (퍼블리싱 용도)
  // const [posts, setPosts] = useState(initialData.data);
  const [posts, setPosts] = useState<Post[]>([]);
  const BookMarkIconMemo = React.memo(BookMarkIcon);

  // 데이터 호출
  const { data : postList, isLoading : isPostListLD, isError : isPostListER, error : postListER  } = PostsQuery(filters);

  const { mutate: bookmark, isError: isBookmarkER, error: bookmarkER} = useMutation({
    mutationFn : updateBookmark,
    onSuccess: (data, variables, context) => {
      console.log('Bookmark updated successfully');
      const { postId } = variables;
      const updatedPosts = posts.map(post =>
        post.id === String(postId) ? { ...post, bookmark: !post.bookmark } : post
      );
      setPosts(updatedPosts);
    },
    onError: (error) => {
      // Handle error case here, e.g., show an error message
      console.error('Error updating bookmark:', error);
    }
  });

  const { mutate: blind, isError: isBlind, error: blindER} = useMutation({
    mutationFn : updateBlind,
    onSuccess: (data, variables, context) => {
      console.log('blind updated successfully');
      const { postId } = variables;
      const updatedPosts = posts.map(post =>
        post.id === String(postId) ? { ...post, blind: !post.blind } : post
      );
      setPosts(updatedPosts);
    },
    onError: (error) => {
      // Handle error case here, e.g., show an error message
      console.error('Error updating blind:', error);
    }
  });

  const toggleStatus = useCallback((id: string, type: 'blind' | 'bookmark') => {
    console.log(`toggle${type.charAt(0).toUpperCase() + type.slice(1)}Status`);
    // 현재 클릭한 게시글 데이터 찾기
    const currentPost = posts.find(post => post.id === id);

    if (!currentPost) {
      console.error('Post not found');
      return;
    }

    if (type === 'blind') {
      const product = {
        postId: Number(id),
        blind: !currentPost.blind
      };
      blind(product);
    } else if (type === 'bookmark') {
      const product = {
        postId: Number(id),
        bookmark: !currentPost.bookmark
      };
      bookmark(product);
    }
  }, [blind, bookmark, posts]);

  // 게시글 북마크 하고자 할 때
  const handleBookMarkIconClick = useCallback((event: React.MouseEvent<HTMLDivElement>, id: string) => {
    event.stopPropagation();
    toggleStatus(id, 'bookmark');
  }, [toggleStatus]);

  // 블라인드 상태 토글하고자 할 때
  const handleMoreClick = useCallback((event: React.MouseEvent<HTMLLIElement>, id: string) => {
    event.stopPropagation();
    toggleStatus(id, 'blind');
  }, [toggleStatus]);

  const handleBlindDataAddClick = useCallback((event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    event.stopPropagation();
    toggleStatus(id, 'blind');
  }, [toggleStatus]);

  const eventStop = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  }, []);

  // 게시글 클릭 할 때
  const handlePostClick = useCallback((id: string) => {
      navigate(`/post/${id}`);
    }, [navigate]);

  // 데이터가 변경될 때 posts 상태 업데이트
  useEffect(() => {
    if (postList?.data) {
      // console.log("data 상태 변경:");
      // console.log(postList.data);
      setPosts(postList.data);
    }
  }, [postList]);

  // posts 상태가 변경될 때마다 로그 출력
  useEffect(() => {
    // console.log("posts 상태 변경:");
    // console.log(posts);
  }, [posts]);

  // 로딩, 에러, 데이터 없음 처리
  if (isPostListLD) return <BoardListWrapper><Board>데이터 로딩중..</Board></BoardListWrapper>;
  // if (isError) return <div>Error: {error?.message}</div>;
  if (isPostListER) return <BoardListWrapper><Board>데이터 로딩에 실패 하였습니다</Board></BoardListWrapper>;
  if (!postList?.data || postList.data.length === 0) return <BoardListWrapper><Board>데이터가 존재하지 않습니다</Board></BoardListWrapper>;

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
              <MoreWrapper onClick={eventStop}>
                <More
                  onClick={handleMoreClick}
                  id={id}
                />
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

const Board = styled.li`
    position: relative;
    display: flex;
    border: 1px solid #BCBACD;
    border-radius: 10px;
    margin-top: 5px;
    padding: 40px 40px;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    font-size: 20px;
    font-weight: 800;
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
    right: -33px;
    top: 0px;
`;