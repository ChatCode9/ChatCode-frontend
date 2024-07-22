import { useState, useEffect, useCallback } from 'react';
import { useMutation, MutationOptions } from '@tanstack/react-query';

import { BlindVariables, BookmarkVariables, Post, ToggleKey, ToggleValue, UpdateFunction } from '../types/post';
import { Filters } from '../types/filter';
import { usePostsQuery } from './api/usePostsQuery';
import { postBookmark } from '../services/post/postBookmark';
import { postBlind } from '../services/post/postBlind';

const usePosts = (filters: Filters) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [showLoadingMessage, setShowLoadingMessage] = useState(false);
  const [showNoDataMessage, setNoDataMessage] = useState(false);
  const [showPagination, setShowPagination] = useState(false);

  const { data: postList, isLoading: isPostListLD, isError: isPostListER } = usePostsQuery(filters);

  // bookmark와 blind API onSuccess 코드가 동일해서 createMutationOptions 을 사용해서 코드정리함
  // 사용방법 => createMutationOptions<전송할 데이터 타입>(호출할 API, 변경할 데이터 KEY)
  // KEY 는 posts 데이터 접근후 업데이트할 key 를 설정하기위해 필요함 *posts 데이터 형태 참고
  const createMutationOptions = <T extends { postId: number }>(
    mutationFn: UpdateFunction<T>,
    key: ToggleKey,
  ): MutationOptions<void, unknown, T> => ({
    mutationFn,
    onSuccess: (_, variables) => {
      // debugger;
      const { postId } = variables;
      const updatedPosts = posts.map((post) => {
        if (post.id === postId) {
          return { ...post, [key]: !post[key] };
        }
        return post;
      });
      setPosts(updatedPosts);
    },
    onError: (error /*, variables*/) => {
      console.error(`${key} 업데이트 오류:`, error);
    },
  });

  // 공통 API 호출
  // createMutationOptions<전송할 데이터 타입>(호출할 API, 변경할 데이터 KEY)
  const bookmarkOptions = createMutationOptions<BookmarkVariables>(postBookmark, 'bookmark');
  const blindOptions = createMutationOptions<BlindVariables>(postBlind, 'blind');

  // react-query mutate 작성
  const { mutate: bookmark } = useMutation(bookmarkOptions);
  const { mutate: blind } = useMutation(blindOptions);

  // 게시글 리스트중 1개의 게시글에 블라인드 또는 북마크하면 실행될 함수
  const toggleStatus = useCallback(
    (id: number, type: ToggleKey, value: ToggleValue) => {
      const currentPost = posts.find((post) => post.id === id);
      if (!currentPost) return;

      const variables = { postId: id, [type]: value };

      if (type === 'blind') {
        blind(variables as BlindVariables);
      } else if (type === 'bookmark') {
        bookmark(variables as BookmarkVariables);
      }
    },
    [blind, bookmark, posts],
  );

  // 데이터 로딩 메시지 띄우기
  useEffect(() => {
    // 150밀리초(0.15초) 후에 실행될 타이머 설정
    const timer = setTimeout(() => {
      if (isPostListLD) {
        setShowLoadingMessage(true);
      }
    }, 150);

    // 컴포넌트가 언마운트되거나 isPostListLD 값이 변경되면 타이머를 정리
    return () => clearTimeout(timer);
  }, [isPostListLD]);

  // 데이터 호출 감지
  useEffect(() => {
    if (postList) {
      // 데이터 갯수 0개인지 먼저 확인
      if (postList.data.length > 0) {
        setPosts(postList.data);
        setShowLoadingMessage(false);
      } else {
        // 데이터 0개인 상태라고 표시
        // ex) 어떻게 검색하느냐에 따라 0개인 경우 생길 수 있음
        setNoDataMessage(true);
      }
    }
  }, [postList]);

  // BoardItem 랜더링 완료후 Pagination 컴포넌트 랜더링 시작
  // 해당 코드 없으면 게시글 리스트 랜더링 전에 먼저 페이지네이션 랜더링됨
  useEffect(() => {
    if (!isPostListLD && !isPostListER && postList) {
      setShowPagination(true);
    }
  }, [isPostListLD, isPostListER, postList]);

  return {
    posts,
    showLoadingMessage,
    showNoDataMessage,
    showPagination,
    toggleStatus,
    pagesCount: postList?.pageInfo.totalPages ? postList?.pageInfo.totalPages + 1 : 1,
  };
};

export default usePosts;
