import { useState, useEffect, useCallback } from 'react';
import { PostsQuery, updateBlind, updateBookmark, updateStatus } from '../../../services/post';
import { Post } from '../../../responseType/postType';
import { Filters } from '../../../requestType/postType';
import initialData from '../../../data/Question_Dummy_data.json';
import { useMutation, MutationOptions } from '@tanstack/react-query';

type ToggleKey = 'bookmark' | 'blind' | 'status';
type ToggleValue = boolean | string;
type UpdateFunction<T> = (variables: T) => Promise<void>;
type BookmarkVariables = { postId: number; bookmark: boolean };
type BlindVariables = { postId: number; blind: boolean };
type StatusVariables = { postId: number; status: string };


const usePosts = (filters: Filters) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [showLoadingMessage, setShowLoadingMessage] = useState(false);
  const [showNoDataMessage, setNoDataMessage] = useState(false);
  const [showPagination, setShowPagination] = useState(false);
  const [fakeData, setFakeData] = useState(false);

  const { data: postList, isLoading: isPostListLD, isError: isPostListER } = PostsQuery(filters);

  const createMutationOptions = <T extends { postId: number }>(
    mutationFn: UpdateFunction<T>,
    key: ToggleKey
  ): MutationOptions<void, unknown, T> => ({
    mutationFn,
    onSuccess: (_, variables) => {
      // debugger;
      const { postId } = variables;
      const updatedPosts = posts.map(post => {
        if (post.id === postId) {
          if (key === 'status') {
            return { ...post, status: 'finish' };
          }
          return { ...post, [key]: !post[key] };
        }
        return post;
      });
      setPosts(updatedPosts);
    },
    onError: (error, variables) => {
      console.error(`${key} 업데이트 오류:`, error);

      if (fakeData) {
        const { postId } = variables;
        const updatedPosts = posts.map(post => {
          if (post.id === postId) {
            if (key === 'status') {
              return { ...post, status: 'finish' };
            }
            return { ...post, [key]: !post[key] };
          }
          return post;
        });
        setPosts(updatedPosts);
      }
    }
  });

  const bookmarkOptions = createMutationOptions<BookmarkVariables>(updateBookmark, 'bookmark');
  const blindOptions = createMutationOptions<BlindVariables>(updateBlind, 'blind');
  const statusOptions = createMutationOptions<StatusVariables>(updateStatus, 'status');

  const { mutate: bookmark } = useMutation(bookmarkOptions);
  const { mutate: blind } = useMutation(blindOptions);
  const { mutate: status } = useMutation(statusOptions);

  const toggleStatus = useCallback((id: number, type: ToggleKey, value: ToggleValue) => {
    const currentPost = posts.find(post => post.id === id);
    if (!currentPost) return;

    const variables = { postId: id, [type]: value };

    if (type === 'blind') {
      blind(variables as BlindVariables);
    } else if (type === 'bookmark') {
      bookmark(variables as BookmarkVariables);
    } else if (type === 'status') {
      status({ postId: id, status: 'finish' });
    }
  }, [blind, bookmark, status, posts]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isPostListLD) {
        setShowLoadingMessage(true);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [isPostListLD]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isPostListLD) {
        setShowLoadingMessage(false);
        if (initialData.data.length > 0) {
          setPosts(initialData.data);
          setFakeData(true);
        } else {
          setNoDataMessage(true);
        }
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isPostListLD]);

  useEffect(() => {
    if (postList) {
      if (postList.data.length > 0) {
        setPosts(postList.data);
        setShowLoadingMessage(false);
      } else {
        setNoDataMessage(true);
      }
    }
  }, [postList]);

  // BoardItem 랜더링 완료후 Pagination 컴포넌트 랜더링 시작
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
  };
};

export default usePosts;
