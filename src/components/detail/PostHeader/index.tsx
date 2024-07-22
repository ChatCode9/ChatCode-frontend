import React, { useCallback /*, useContext, useEffect,*/, useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { Sub, Title, Wrapper } from './styles';
import ActionButtons from './ActionButtons';
import Divider from '../../board/Divider';
import { timeDifference } from '../../../utils/timeDifference.ts';
// import { formatDate } from '../../../utils/formatDate.ts';
import { formatViewCount } from '../../../utils/formatViewCount.ts';
import More from '../../board/More';
import { postLike } from '../../../services/post/postLike.ts';
import { NotificationToast } from '../../modal/NotificationToast.tsx';
import VotingComponent from './VotingComponent.tsx';
import ModalCustom1 from '../../modal/ModalCustom1.tsx';
import { getLikesCount } from '../../../services/post/getLikesCount.ts';
import { postBookmark } from '../../../services/post/postBookmark.ts';
import { updateStatusWrapper } from '../../../services/post/updateStatusWrapper.ts';
import { useToastControl } from '../../../hooks/useToastControl.ts';
import { Post } from '../../../types/post.ts';

interface Props {
  postData?: Post;
  isGuest?: boolean;
}

function PostHeader({ postData, isGuest = false }: Props) {
  const { showToast, hideToast } = useToastControl();
  const [postStatus, setPostStatus] = useState<string>(postData?.status || '');
  const [isBookmark, setIsBookmark] = useState<boolean>(postData?.bookmark || false);
  const [liked, setLiked] = useState<boolean | null>(postData?.isLiked || null);
  const [likedCount, setLikedCount] = useState<number>(postData?.likeCount || 0);

  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [switchPostId, setSwitchPostId] = useState<number | null>(null);

  // 북마크 mutate
  const { mutate: postBookmarkMutate } = useMutation({
    mutationFn: postBookmark,
    onSuccess: () => {
      setIsBookmark(!isBookmark);
    },
    onError: () => {
      showToast('서버 통신 실패');
    },
  });

  // 좋아요/싫어요 mutate
  // API 성공후 해당 게시글 좋아요/싫어요수 조회 API 호출(GET)
  const { mutate: updateLikeFn } = useMutation({
    mutationFn: postLike,
    onSuccess: async (_, variables) => {
      setLiked(variables.data.isLike);
      const likesCountResponse = await getLikesCount(postData?.id as number); // API CALL
      setLikedCount(likesCountResponse.data);
    },
    onError: () => {
      showToast('서버 통신 실패');
    },
  });

  // 게시글 상태 mutate
  // 해결대기에서 해결완료로 변경
  const { mutate: updateStatusFn } = useMutation({
    mutationFn: updateStatusWrapper,
    onSuccess: () => {
      setPostStatus('finish');
    },
    onError: () => {
      showToast('서버 통신 실패');
    },
  });

  // 이미 좋아요/싫어요 눌렀는지 체크후 안되어있다면 UPDATE API 호출
  const handleLikeStatus = (isLike: boolean) => {
    if (liked === null) {
      updateLikeFn({ data: { isLike }, postId: postData?.id as number });
    } else {
      showToast('이미 좋아요/싫어요 클릭하셨습니다');
    }
  };

  // 좋아요/싫어요 함수
  const handleLike = () => handleLikeStatus(true);
  const handleDislike = () => handleLikeStatus(false);

  // 북마크 함수
  const handleToggleBookmark = () => {
    postBookmarkMutate({ postId: postData?.id as number });
  };

  // 공유하기 클릭시 클립보드에 현재 주소 복사 + 모달창으로 '복사되었습니다' 띄우기
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('복사되었습니다');
  };

  // More 컴포넌트 호출 -> 글 수정, 글 삭제 버튼 보여줌
  // 그리고 다른 컴포넌트로 이벤트 전파 막기
  const handleMoreClick = useCallback((event: React.MouseEvent<HTMLButtonElement>, postId: number) => {
    console.log(postId);
    event.stopPropagation();
  }, []);

  // 해결대기 버튼 클릭시 동작 함수
  const handlePostStatus = () => {
    if (postStatus === 'finish') {
      showToast('이미 해결된 질문입니다');
    } else {
      setSwitchPostId(postData?.id as number);
      setIsFirstModalOpen(true);
    }
  };

  // 해결대기에서 모달창 '전환' 클릭시 동작 함수
  const handleFirstModalConfirm = () => {
    console.log('First modal confirmed');
    console.log(`해결 완료로 전환될 게시글 번호 : ${switchPostId}`);
    // API 호출
    const data = { status: 'finish' };
    updateStatusFn({ postId: postData?.id as number, data });
    setIsFirstModalOpen(false);
  };

  if (!postData) {
    return null;
  }

  const { title, timeline, viewCount, isLiked } = postData;

  return (
    <Wrapper>
      <div className="voting">
        <VotingComponent voteCount={likedCount} isLiked={isLiked} onLike={handleLike} onDislike={handleDislike} />
      </div>
      <Title>{title}</Title>
      <Sub>
        <span>{timeDifference(timeline)} 작성</span>
        {/* <span>
          {formatDate(timeline)} {updated ? '수정' : ''}
        </span> */}
        <span>조회수 {formatViewCount(viewCount)}</span>
      </Sub>
      <ActionButtons
        postStatus={postStatus}
        bookmark={isBookmark}
        onPostStatus={handlePostStatus}
        onToggleBookmark={handleToggleBookmark}
        onShare={handleShare}
      />
      {!isGuest && (
        <div className="more">
          <More onClick={(event) => handleMoreClick(event, postData.id)} id={postData?.id} isUserPost={true} />
        </div>
      )}
      <Divider />
      <NotificationToast onClose={hideToast} />

      <div>
        <ModalCustom1
          isOpen={isFirstModalOpen}
          onClose={() => setIsFirstModalOpen(false)}
          onConfirm={handleFirstModalConfirm}
        >
          <h3>해결 완료로 전환 하시겠습니까?</h3>
          <p>*해결 완료로 전환 시 대기로 재 전환 불가합니다.</p>
        </ModalCustom1>
      </div>
    </Wrapper>
  );
}

export default PostHeader;
