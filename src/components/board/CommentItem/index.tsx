import { BiLike } from 'react-icons/bi';
import { BiDislike } from 'react-icons/bi';
import { Content, Header, ToggleBtn } from './styles';
import { useState } from 'react';
import { ReplyType } from '../CommentList';
import CommentInput from '../CommentInput';

interface Props {
  avatar: string;
  username: string;
  timestamp: string;
  likeCount: number;
  disLikeCount: number;
  comment: string;
  reply: ReplyType[];
}

function CommentItem({ avatar, username, timestamp, likeCount, disLikeCount, comment, reply }: Props) {
  const [isOpenInput, setIsOpenInput] = useState();

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

      <CommentInput />
    </>
  );
}

export default CommentItem;
