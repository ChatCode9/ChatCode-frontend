import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Sub, Title, Wrapper } from './styles';
import ActionButtons from './ActionButtons';
import Divider from '../../board/Divider';
import { timeDifference } from '../../../utils/timeDifference.ts';
import { formatDate } from '../../../utils/formatDate.ts';
import { formatViewCount } from '../../../utils/formatViewCount.ts';
import More from '../../board/More';
import { useMutation } from '@tanstack/react-query';
import { updateBookmark } from '../../../services/post.ts';
import { NotificationModal } from './NotificationModal.tsx';
import VotingComponent from './VotingComponent.tsx';

import { SolveModal } from '../../SolveModal.tsx';

import axios from 'axios';
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
  isLiked: boolean;
  isDisliked: boolean;
  isGuest?: boolean;
}

function PostHeader({ postId, title, timeline, updated, viewCount, status, bookmark, likeCount, isLiked, isDisliked,  isGuest = false }: Props) {
  const [postStatus, setPostStatus] = useState(status);
  const [isBookmark, setIsBookmark] = useState(bookmark);

  const [isModalVisible, setModalVisible] = useState(false);

  const [isSolveModalVisible, setIsSolveModalVisible] = useState(false);
  const dispatch = useContext(ModalsDispatchContext);

  const [voteCount, setVoteCount] = useState(likeCount);
  const [liked, setLiked] = useState(isLiked);
  const [disliked, setDisliked] = useState(isDisliked);

  const userId = 1; // 예시 사용자 ID

  const { mutate } = useMutation({
    mutationFn: updateBookmark,
    onSuccess: () => {
      setIsBookmark(!isBookmark);
    },
  });

  const handleToggleBookmark = () => {
    mutate({postId : postId, bookmark : !isBookmark});
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setModalVisible(true);
  };

  const handleMoreClick = useCallback((event: React.MouseEvent<HTMLButtonElement>, postId: number) => {
    event.stopPropagation();
  },[]);

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleLike = () => {
    if (liked) {
      updateLikeState(false, false);
    } else {
      updateLikeState(true, false);
    }
  };

  const handleDislike = () => {
    if (disliked) {
      updateLikeState(false, false);
    } else {
      updateLikeState(false, true);
    }
  };

  useEffect(() => {
    setLiked(isLiked);
    setDisliked(isDisliked);
  }, [isLiked, isDisliked]);

  const updateLikeState = (newLiked: boolean, newDisliked: boolean) => {
    axios.post(`http://localhost:4000/posts/likes`, {
      postId: postId,
      userId: userId,
      isLiked: newLiked,
      isDisliked: newDisliked
    })
      .then(() => {
        setLiked(newLiked);
        setDisliked(newDisliked);
        setVoteCount(prevCount => {
          if (newLiked && !newDisliked) return disliked ? prevCount + 2 : prevCount + 1;
          if (!newLiked && newDisliked) return liked ? prevCount - 2 : prevCount - 1;
          if (!newLiked && !newDisliked) return liked ? prevCount - 1 : prevCount + 1;
          return prevCount;
        });
      })
      .catch(error => {
        console.error('Error updating like/dislike state', error);
      });
  };

  const handlePostStatus = () => {
    if (dispatch) {
      dispatch.showModal({
        title: '해결 완료로 전환 하시겠습니까?',
        message: '해결 완료로 전환 시 대기로 재 전환 불가합니다.',
        confirm1: '전환',
        confirm2: '취소',
        postId: postId,
      });
    }
    setIsSolveModalVisible(true);
  }

  const handleConfirm = useCallback(() => {
    console.log('handleConfirm');
    if (dispatch) {
      dispatch.hideModal();
    }
    // 추가적인 로직을 여기에 추가합니다.
  }, [dispatch]);

  const modalData = {
    top: 300,
    left: 120,
    position : 'absolute'
  }

  return (
    <Wrapper>
      <div className="voting">
        <VotingComponent
          voteCount={voteCount}
          isLiked={liked}
          isDisliked={disliked}
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
        message="복사되었습니다"
        isVisible={isModalVisible}
        onClose={handleCloseModal}
      />

      {isSolveModalVisible && (
        <SolveModal data={modalData} onConfirm={handleConfirm} />
      )}

    </Wrapper>
  );
}

export default PostHeader;
