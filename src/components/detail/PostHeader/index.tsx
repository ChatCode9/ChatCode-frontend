import React, { useCallback, useState } from 'react';
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

interface Props {
  postId: number;
  title: string;
  timeline: string | number | Date;
  updated : boolean;
  viewCount: number;
  bookmark: boolean;
}

function PostHeader({ postId, title, timeline, updated, viewCount, bookmark }: Props) {
  const [isBookmark, setIsBookmark] = useState(bookmark);
  const [isModalVisible, setModalVisible] = useState(false);

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
    console.log('handleShare')
    navigator.clipboard.writeText(window.location.href);
    setModalVisible(true);
  };

  const handleMoreClick = useCallback((event: React.MouseEvent<HTMLButtonElement>, postId: number) => {
    event.stopPropagation();
  },[]);

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <Wrapper>
      <Title>{title}</Title>
      <Sub>
        <span>{timeDifference(timeline)} 작성</span>
        <span>{formatDate(timeline)} {updated ? '수정' : ''}</span>
        <span>조회수 {formatViewCount(viewCount)}</span>
      </Sub>
      <div className="more">
        <More onClick={(event) => handleMoreClick(event, postId)} id={postId} isUserPost={true} />
      </div>
      <ActionButtons bookmark={isBookmark} onToggleBookmark={handleToggleBookmark} onShare={handleShare} />
      <Divider />
      <NotificationModal
        message="복사되었습니다"
        isVisible={isModalVisible}
        onClose={handleCloseModal}
      />
    </Wrapper>
  );
}

export default PostHeader;
