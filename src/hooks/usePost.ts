import { useCallback } from 'react';
import { Post, ToggleKey, ToggleValue } from '../types/post';
import { useNavigate } from 'react-router-dom';

interface Props {
  posts: Post[];
  toggleStatus: (id: number, type: ToggleKey, value: ToggleValue) => void;
}

const usePost = ({ posts, toggleStatus }: Props) => {
  const navigate = useNavigate();

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
    (id: number, blind?: boolean) => {
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

  return { handleBookMarkIconClick, handleMoreClick, handleBlindDataAddClick, handlePostClick, eventStop };
};

export default usePost;
