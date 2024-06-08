import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MutationOptions, useMutation } from '@tanstack/react-query';
import { PostsQuery, updateBlind, updateBookmark } from '../../../services/post';
import { Post } from '../../../responseType/postType';
import { Filters } from '../../../requestType/postType';
import BoardItem from './BoardItem';
import { Board, BoardListWrapper } from './styles';
import BookMarkIcon from '../BookMarkIcon';
import PaginationRounded from '../Pagination'; // BookMarkIcon 직접 임포트
import initialData from '../../../data/Question_Dummy_data.json';

// 타입 정의
type BookmarkVariables = { postId: number; bookmark: boolean };
type BlindVariables = { postId: number; blind: boolean };

interface Props {
  filters: Filters;
}

function QuestionBoardList({ filters }: Props) {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const BookMarkIconMemo = React.memo(BookMarkIcon);
  const [showPagination, setShowPagination] = useState(false);

  // 데이터 호출
  const { data: postList, isLoading: isPostListLD, isError: isPostListER, error: postListER } = PostsQuery(filters);

  const bookmarkOptions: MutationOptions<void, unknown, BookmarkVariables> = {
    mutationFn: (variables: BookmarkVariables) => {
      // updateBookmark 함수를 variables.postId 및 variables.bookmark와 함께 호출합니다.
      return updateBookmark(variables);
    },
    onSuccess: (data, variables) => {
      console.log('북마크가 성공적으로 업데이트되었습니다.');
      const { postId } = variables;
      const updatedPosts = posts.map(post =>
        post.id === String(postId) ? { ...post, bookmark: !post.bookmark } : post
      );
      setPosts(updatedPosts);
    },
    onError: (error) => {
      console.error('북마크 업데이트 오류:', error);
    }
  };

  const blindOptions: MutationOptions<void, unknown, BlindVariables> = {
    mutationFn: (variables: BlindVariables) => {
      // updateBlind 함수를 variables.postId 및 variables.blind와 함께 호출합니다.
      return updateBlind(variables);
    },
    onSuccess: (data, variables) => {
      console.log('블라인드 처리가 성공적으로 업데이트되었습니다.');
      const { postId } = variables;
      const updatedPosts = posts.map(post =>
        post.id === String(postId) ? { ...post, blind: !post.blind } : post
      );
      setPosts(updatedPosts);
    },
    onError: (error) => {
      console.error('블라인드 처리 업데이트 오류:', error);
    }
  };

  // useMutation 훅 사용
  const { mutate: bookmark} = useMutation(bookmarkOptions);
  const { mutate: blind } = useMutation(blindOptions);

  const toggleStatus = useCallback((id: string, type: 'blind' | 'bookmark') => {
    const currentPost = posts.find(post => post.id === id);
    if (!currentPost) return;

    if (type === 'blind') {
      blind({ postId: Number(id), blind: !currentPost.blind });
    } else if (type === 'bookmark') {
      bookmark({ postId: Number(id), bookmark: !currentPost.bookmark });
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

  useEffect(() => {
    if (isPostListER) {
      setPosts(initialData.data);
    } else if (postList?.data) {
      setPosts(postList.data);
    }
  }, [postList, isPostListER]);

  // BoardItem 랜더링 완료후 Pagination 컴포넌트 랜더링 시작
  useEffect(() => {
    if (!isPostListLD && !isPostListER && postList) {
      setShowPagination(true); // Show pagination after posts are loaded
    }
  }, [isPostListLD, isPostListER, postList]); // Trigger effect when loading/error state or postList changes

  if (isPostListLD) return <BoardListWrapper><Board>데이터 로딩중...</Board></BoardListWrapper>;
  // if (!postList?.data || postList.data.length === 0) return <BoardListWrapper><Board>데이터가 존재하지 않습니다</Board></BoardListWrapper>;

  return (
    <BoardListWrapper>
      {posts.map(post => (
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
      {showPagination && (
        <PaginationRounded />
      )}
    </BoardListWrapper>
  );
}

export default QuestionBoardList;
