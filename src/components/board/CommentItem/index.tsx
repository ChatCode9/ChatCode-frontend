import { useState } from 'react';
import { BiLike } from 'react-icons/bi';
import { BiDislike } from 'react-icons/bi';

import { Content, Header, ToggleBtn } from './styles';
import { ReplyType } from '../CommentList';
import CommentInput from '../../detail/CommentInput';

interface Props {
  avatar: string;
  username: string;
  timestamp: string;
  likeCount: number;
  disLikeCount: number;
  comment: string;
  reply: ReplyType[];
}

function CommentItem({ avatar, username, timestamp, likeCount, disLikeCount, comment }: Props) {
  const [isOpenInput] = useState<boolean>(false);

  return (
    <>
      <Header>
        <div className="profile">
          <img className="avatar" src={avatar} alt={username} />
          <p className="username">{username}</p>
          <span className="timestamp">{timestamp} 작성</span>
        </div>
        <div className="actions">
          <button className="btn btn-like">
            <BiLike className="ico" />
            <span className="count">{likeCount}</span>
          </button>
          <button className="btn btn-dislike">
            <BiDislike className="ico" />
            <span className="count">{disLikeCount}</span>
          </button>
        </div>
      </Header>

      <Content>{comment}</Content>

      <ToggleBtn>{isOpenInput ? '댓글 닫기' : '댓글 보기'}</ToggleBtn>

      <CommentInput type="textarea" />
    </>
  );
}

export default CommentItem;
