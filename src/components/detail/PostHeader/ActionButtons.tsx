import { Actions } from './styles';
import styled from 'styled-components';
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5';
import { PiShareFat } from 'react-icons/pi';

interface Props {
  postStatus: string;
  bookmark: boolean;
  onPostStatus: () => void;
  onToggleBookmark: () => void;
  onShare: () => void;
}

function ActionButtons({ postStatus, bookmark, onPostStatus, onToggleBookmark, onShare }: Props) {
  return (
    <Actions>
      <BoardStatus $postStatus={postStatus} onClick={onPostStatus}>
        {postStatus === 'wait' ? '해결 대기' : '해결 완료'}
      </BoardStatus>
      <button onClick={onToggleBookmark}>
        {bookmark ? <IoBookmark size={30} /> : <IoBookmarkOutline size={30} />}
      </button>
      <button onClick={onShare}>
        <PiShareFat size={30} />
      </button>
    </Actions>
  );
}

export default ActionButtons;

export const BoardStatus = styled.div<{ $postStatus: string }>`
    width: 95px;
    height: 38px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 2px;
    font-weight: 700;
    font-size: 14px;
    margin-right: 10px;

    color: ${(props) => (props.$postStatus === 'wait' ? '#5d5a88' : '#fff')};
    border: ${(props) => (props.$postStatus === 'wait' ? '2px solid #8d8ba7' : 'none')};
    background-color: ${(props) => (props.$postStatus === 'wait' ? 'transparnt' : '#5D5A88')};
`;
