import { AiOutlineLike } from 'react-icons/ai';
import { AiOutlineDislike } from 'react-icons/ai';
import { CommentType } from '../../../types/comment';
import { Item } from './styles';

function CommentItem(props: CommentType) {
  const { avatar, writer, timestamp, likeCount, dislikeCount, comment } = props;

  return (
    <Item>
      <div className="header">
        <div className="left">
          <img className="avatar" src={avatar} alt={writer} />
          <p className="writer">{writer}</p>
          <span className="timestamp">{timestamp}</span>
        </div>

        <div className="right">
          <button className="btn">
            <AiOutlineLike fontSize={20} />
            {likeCount}
          </button>
          <button className="btn">
            <AiOutlineDislike fontSize={20} />
            {dislikeCount}
          </button>
        </div>
      </div>

      <div className="comment">{comment}</div>
    </Item>
  );
}

export default CommentItem;
