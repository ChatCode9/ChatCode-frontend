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

type ToggleKey = 'bookmark' | 'blind';

// updateBookmark와 updateBlind 함수의 타입 정의
type UpdateFunction<T> = (variables: T) => Promise<void>;

// Bookmark와 Blind의 변수 타입 정의
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
  const [showLoadingMessage, setShowLoadingMessage] = useState(false);
  const [showNoDataMessage, setNoDataMessage] = useState(false);
  const [fakeData, setFakeData] = useState(false);

  // 데이터 호출
  const { data: postList, isLoading: isPostListLD, isError: isPostListER } = PostsQuery(filters);

  const createMutationOptions = <T extends { postId: number }>(
    mutationFn: UpdateFunction<T>,
    key: ToggleKey
  ): MutationOptions<void, unknown, T> => ({
    mutationFn,
    onSuccess: (_, variables) => {
      const { postId } = variables;
      const updatedPosts = posts.map(post =>
        post.id === postId ? { ...post, [key]: !post[key] } : post
      );
      setPosts(updatedPosts);
    },
    onError: (error, variables) => {
      console.error(`${key} 업데이트 오류:`, error);

      // 퍼블리싱 용도 코드
      if (fakeData) {
        const { postId } = variables;
        const updatedPosts = posts.map(post =>
          post.id === postId ? { ...post, [key]: !post[key] } : post
        );
        setPosts(updatedPosts);
      }
    }
  });

  const bookmarkOptions = createMutationOptions<BookmarkVariables>(updateBookmark, 'bookmark');
  const blindOptions = createMutationOptions<BlindVariables>(updateBlind, 'blind');

  // useMutation 훅 사용
  const { mutate: bookmark } = useMutation(bookmarkOptions);
  const { mutate: blind } = useMutation(blindOptions);

  const toggleStatus = useCallback((id: number, type: 'blind' | 'bookmark') => {
    const currentPost = posts.find(post => post.id === id);
    if (!currentPost) return;

    const variables = { postId: Number(id), [type]: !currentPost[type] };

    if (type === 'blind') {
      blind(variables as BlindVariables);
    } else if (type === 'bookmark') {
      bookmark(variables as BookmarkVariables);
    }
  }, [blind, bookmark, posts]);

  // 게시글 북마크 하고자 할 때
  const handleBookMarkIconClick = useCallback((event: React.MouseEvent<HTMLDivElement>, id: number) => {
    event.stopPropagation();
    toggleStatus(id, 'bookmark');
  }, [toggleStatus]);

  // 블라인드 상태 토글하고자 할 때
  const handleMoreClick = useCallback((event: React.MouseEvent<HTMLButtonElement>, id: number) => {
    event.stopPropagation();
    toggleStatus(id, 'blind');
  }, [toggleStatus]);

  const handleBlindDataAddClick = useCallback((event: React.MouseEvent<HTMLButtonElement>, id: number) => {
    event.stopPropagation();
    toggleStatus(id, 'blind');
  }, [toggleStatus]);

  const eventStop = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  }, []);

  // 게시글 클릭 할 때
  const handlePostClick = useCallback((id: number, blind: boolean) => {
    if (!blind) {
      navigate(`/post/${id}`);
    }
  }, [navigate]);

  // 0.15초 후에도 데이터 로딩 메시지 표시
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isPostListLD) {
        setShowLoadingMessage(true);
      }
    }, 150); // 0.15초

    return () => clearTimeout(timer);
  }, [isPostListLD]);

  // 3초 후에도 데이터 로딩 실패 시 초기 데이터 설정
  // 퍼블리싱 용도 함수
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isPostListLD) {
        setShowLoadingMessage(false);
        if(initialData.data.length > 0){
          setPosts(initialData.data);
          setFakeData(true);
        } else {
          setNoDataMessage(true);
        }
      }
    }, 3000); // 3초

    return () => clearTimeout(timer);
  }, [isPostListLD]);

  // 데이터 로딩되면 데이터 바인딩 + 데이터 로딩 메시지 제거
  useEffect(() => {
    if (postList) {
      if(postList.data.length > 0){
        setPosts(postList.data);
        // 데이터 로딩중 표시 제거
        setShowLoadingMessage(false);
      } else {
        // 데이터 0건이면 표시
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
