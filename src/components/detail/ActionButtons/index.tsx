import clsx from 'clsx';
import { BiLike } from 'react-icons/bi';
import { BiDislike } from 'react-icons/bi';
import { Container } from './styles';

interface ActionButtonsProps {
  liked: boolean;
  disliked: boolean;
  onLikeClick: () => void;
  onDislikeClick: () => void;
}

function ActionButtons({ liked, disliked, onLikeClick, onDislikeClick  } : ActionButtonsProps) {
  return (
    <Container>
      <div className="inner">
        <button
          className={clsx('btn-like', { 'btn-reverse': liked })}
          onClick={onLikeClick}
        >
          <BiLike />
        </button>
        <button
          className={clsx('btn-dislike', { 'btn-reverse': disliked })}
          onClick={onDislikeClick}
        >
          <BiDislike />
        </button>
      </div>
    </Container>
  );
}

export default ActionButtons;
