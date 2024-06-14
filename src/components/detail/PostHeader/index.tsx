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
import { NotificationModal } from './NotificationModal.tsx';
import VotingComponent from './VotingComponent.tsx';

import { SolveModal } from '../../SolveModal.tsx';

import { ModalsDispatchContext } from '../../../context/ModalsContext.tsx';

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

  const dispatch = useContext(ModalsDispatchContext);

  const [liked, setLiked] = useState<boolean | null>(isLiked);
  const [voteCount, setVoteCount] = useState(likeCount);

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

  const handleLikeStatus = (isLike: boolean) => {
    if (liked === null) {
      updateLikeFn({ data: { isLike }, postId });
    } else {
      setModalMessage('이미 좋아요/싫어요 클릭하셨습니다');
      setModalVisible(true);
    }
  };

  const handleLike = () => handleLikeStatus(true);
  const handleDislike = () => handleLikeStatus(false);

  const handleToggleBookmark = () => {
    updateBookmarkFn({postId : postId, bookmark : !isBookmark});
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setModalMessage('복사되었습니다');
    setModalVisible(true);
  };

  const handleMoreClick = useCallback((event: React.MouseEvent<HTMLButtonElement>, postId: number) => {
    event.stopPropagation();
  },[]);

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handlePostStatus = () => {
    if(postStatus === 'finish') {
      setModalMessage('이미 해결된 질문입니다');
      setModalVisible(true);
    } else if (dispatch) {
      dispatch.showModal({
        title: '해결 완료로 전환 하시겠습니까?',
        message: '해결 완료로 전환 시 대기로 재 전환 불가합니다.',
        confirm1: '전환',
        confirm2: '취소',
        top: 300,
        left: 120,
        position : 'absolute'
      });
    }
  }

  const handleConfirm = useCallback(() => {
    console.log('handleConfirm');
    const data = { status: 'finish' };
    updateStatusFn({ postId, data });
  }, [dispatch, postId]);

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

      <SolveModal onConfirm={handleConfirm} />

    </Wrapper>
  );
}

export default PostHeader;
