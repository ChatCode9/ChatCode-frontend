import { BiBookmark } from 'react-icons/bi';
import { BiSolidBookmark } from 'react-icons/bi';
import { BiShare } from 'react-icons/bi';
import { Actions } from './styles';

interface Props {
  bookmark: boolean;
  onToggleBookmark: () => void;
  onShare: () => void;
}

function ActionButtons({ bookmark, onToggleBookmark, onShare }: Props) {
  return (
    <Actions>
      <button onClick={onToggleBookmark}>
        {bookmark ? <BiSolidBookmark className="icon ico-bookmark" /> : <BiBookmark className="icon ico-bookmark" />}
      </button>
      <button onClick={onShare}>
        <BiShare className="icon ico-share" />
      </button>
    </Actions>
  );
}

export default ActionButtons;
