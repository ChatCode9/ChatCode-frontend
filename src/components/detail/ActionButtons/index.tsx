import clsx from 'clsx';
import { BiLike } from 'react-icons/bi';
import { BiDislike } from 'react-icons/bi';
import { Container } from './styles';

function ActionButtons() {
  return (
    <Container>
      <div className="inner">
        <button className={clsx('btn-like', { 'btn-reverse': true })}>
          <BiLike />
        </button>
        <button className={clsx('btn-dislike', { 'btn-reverse': false })}>
          <BiDislike />
        </button>
      </div>
    </Container>
  );
}

export default ActionButtons;
