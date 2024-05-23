import { useState } from 'react';
import { Sub, Title, Wrapper } from './styles';
import ActionButtons from './ActionButtons';
import More from '../../board/More';
import Divider from '../../board/Divider';

interface Props {
  title: string;
  viewCount: string;
  bookmark: boolean;
}

function PostHeader({ title, viewCount, bookmark }: Props) {
  const [isBookmark, setIsBookmark] = useState(bookmark);

  const handleToggleBookmark = () => {
    // TODO
    setIsBookmark(!isBookmark);
  };

  const handleShare = () => {
    // TODO
  };

  return (
    <Wrapper>
      <Title>{title}</Title>
      <Sub>
        <span>1시간 전 작성</span>
        <span>24.04.23. 14:52 수정</span>
        <span>조회수 {viewCount}</span>
      </Sub>
      <div className="more">
        <More
          options={[
            { label: '이 글 더 이상 그만보기', callback: () => {} },
            { label: '수정하기', callback: () => {} },
            { label: '삭제하기', callback: () => {} },
          ]}
        />
      </div>
      <ActionButtons bookmark={isBookmark} onToggleBookmark={handleToggleBookmark} onShare={handleShare} />
      <Divider />
    </Wrapper>
  );
}

export default PostHeader;
