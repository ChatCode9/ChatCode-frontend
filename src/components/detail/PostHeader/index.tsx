import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Sub, Title, Wrapper } from './styles';
import ActionButtons from './ActionButtons';
import Divider from '../../board/Divider';
import { timeDifference } from '../../../utils/timeDifference.ts';
import { formatDate } from '../../../utils/formatDate.ts';
import { formatViewCount } from '../../../utils/formatViewCount.ts';
import More from '../../board/More';
import { useMutation } from '@tanstack/react-query';
import {
  getLikesCount,
  updateBookmark,
  updateLike,
  updateStatusWrapper,
} from '../../../services/post.ts';
import { NotificationModal } from '../../modal/NotificationModal.tsx';
import VotingComponent from './VotingComponent.tsx';
import ModalCustom1 from '../../modal/ModalCustom1.tsx';

interface Props {
  postId: number;
  title: string;
  timeline: string | number | Date;
  updated : boolean;
  viewCount: number;
  status: string;
  bookmark: boolean;
  likeCount: number;
  isLiked: boolean | null;
  isGuest?: boolean;
}

function PostHeader({ postId, title, timeline, updated, viewCount, status, bookmark, likeCount, isLiked, isGuest = false }: Props) {
  const [postStatus, setPostStatus] = useState(status);
  const [isBookmark, setIsBookmark] = useState(bookmark);

  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const [liked, setLiked] = useState<boolean | null>(isLiked);
  const [voteCount, setVoteCount] = useState(likeCount);

  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [switchPostId, setSwitchPostId] = useState<number | null>(null);

  // 북마크 mutate
  const { mutate : updateBookmarkFn } = useMutation({
    mutationFn: updateBookmark,
    onSuccess: () => {
      setIsBookmark(!isBookmark);
    },
    onError: () => {
      setModalMessage('서버 통신 실패');
      setModalVisible(true);
    }
  });

  // 좋아요/싫어요 mutate
  // API 성공후 해당 게시글 좋아요/싫어요수 조회 API 호출(GET)
  const { mutate : updateLikeFn } = useMutation({
    mutationFn : updateLike,
    onSuccess: async (_, variables) => {
      setLiked(variables.data.isLike);
      try {
        const likesCountResponse = await getLikesCount(postId); // API CALL
        setVoteCount(likesCountResponse.data);
      } catch (error) {
        setModalMessage('서버 통신 실패');
        setModalVisible(true);
      }
    },
    onError: () => {
      setModalMessage('서버 통신 실패');
      setModalVisible(true);
    }
  });

  // 게시글 상태 mutate
  // 해결대기에서 해결완료로 변경
  const { mutate : updateStatusFn } = useMutation({
    mutationFn: updateStatusWrapper ,
    onSuccess: () => {
      setPostStatus('finish');
    },
    onError: () => {
      setModalMessage('서버 통신 실패');
      setModalVisible(true);
    }
  });

  // 이미 좋아요/실어요 눌렀는지 체크후 안되어있다면 UPDATE API 호출
  const handleLikeStatus = (isLike: boolean) => {
    if (liked === null) {
      updateLikeFn({ data: { isLike }, postId });
    } else {
      setModalMessage('이미 좋아요/싫어요 클릭하셨습니다');
      setModalVisible(true);
    }
  };

  // 좋아요/싫어요 함수
  const handleLike = () => handleLikeStatus(true);
  const handleDislike = () => handleLikeStatus(false);

  // 북마크 함수
  const handleToggleBookmark = () => {
    updateBookmarkFn({postId : postId, bookmark : !isBookmark});
  };

  // 공유하기 클릭시 클립보드에 현재 주소 복사 + 모달창으로 '복사되었습니다' 띄우기
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setModalMessage('복사되었습니다');
    setModalVisible(true);
  };

  // More 컴포넌트 호출 -> 글 수정, 글 삭제 버튼 보여줌
  // 그리고 다른 컴포넌트로 이벤트 전파 막기
  const handleMoreClick = useCallback((event: React.MouseEvent<HTMLButtonElement>, postId: number) => {
    event.stopPropagation();
  },[]);

  // 모달창 Close 버튼 클릭시 동작 함수
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  // 해결대기 버튼 클릭시 동작 함수
  const handlePostStatus = () => {
    if(postStatus === 'finish') {
      setModalMessage('이미 해결된 질문입니다');
      setModalVisible(true);
    } else {
      setSwitchPostId(postId);
      setIsFirstModalOpen(true);
    }
  }

  // 해결대기에서 모달창 '전환' 클릭시 동작 함수
  const handleFirstModalConfirm = () => {
    console.log('First modal confirmed');
    console.log(`해결 완료로 전환될 게시글 번호 : ${switchPostId}`);
    // API 호출
    const data = { status: 'finish' };
    updateStatusFn({ postId, data });
    setIsFirstModalOpen(false);
  };

  return (
    <Wrapper>
      <div className="voting">
        <VotingComponent
          voteCount={voteCount}
          isLiked={liked}
          onLike={handleLike}
          onDislike={handleDislike}
        />
      </div>
      <Title>{title}</Title>
      <Sub>
        <span>{timeDifference(timeline)} 작성</span>
        <span>{formatDate(timeline)} {updated ? '수정' : ''}</span>
        <span>조회수 {formatViewCount(viewCount)}</span>
      </Sub>
      <ActionButtons postStatus={postStatus} bookmark={isBookmark} onPostStatus={handlePostStatus} onToggleBookmark={handleToggleBookmark} onShare={handleShare} />
      {
        !isGuest && (
          <div className="more">
            <More onClick={(event) => handleMoreClick(event, postId)} id={postId} isUserPost={true} />
          </div>
        )
      }
      <Divider />
      <NotificationModal
        message={modalMessage}
        isVisible={isModalVisible}
        onClose={handleCloseModal}
      />

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
