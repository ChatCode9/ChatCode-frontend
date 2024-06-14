import { Container } from './styles';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import styled from 'styled-components';
import { timeDifference } from '../../../utils/timeDifference.ts';
import ReplayInput from '../ReplayInput';
import { MouseEvent, useEffect, useRef, useState } from 'react';

interface CommentType {
  commentId: number;
  postId: number;
  userId: string;
  username: string;
  avatar: string;
  comment: string;
  timestamp: string;
  parentId: number | null;
  depth: number;
  groupId: number;
  mentionedUser: string | null;
  likeCount: number;
  disLikeCount: number;
  replyCount: number;
  isRole: boolean;
}

interface Props {
  comments: CommentType[];
}

function CommentList({ comments }: Props) {
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [visibleReplies, setVisibleReplies] = useState<number[]>([]);
  const prevButtonRef = useRef<HTMLDivElement | HTMLButtonElement | null>(null);

  const toggleButtonText = (target: HTMLDivElement | HTMLButtonElement) => {
    if (prevButtonRef.current && prevButtonRef.current !== target) {
      prevButtonRef.current.innerText = '댓글달기';
    }

    if (target.innerText === '댓글달기') {
      target.innerText = '댓글취소';
      prevButtonRef.current = target;
    } else {
      target.innerText = '댓글달기';
      prevButtonRef.current = null;
    }
  };

  // 등록 버튼 근처 취소 버튼
  const handleReplayAction = (event: MouseEvent<HTMLButtonElement>, commentId: number, groupId: number) => {
    const combinedId = `${commentId}-${groupId}`;
    console.log(combinedId);
    const target = event.currentTarget as HTMLButtonElement;

    toggleButtonText(target);
    setActiveReplyId(prev => (prev === combinedId ? null : combinedId));
  };

  // 왼쪽 댓글 달기/취소 버튼
  const handleAction = (event: MouseEvent<HTMLDivElement>, commentId: number, groupId: number) => {
    const target = event.currentTarget as HTMLDivElement;
    const combinedId = `${commentId}-${groupId}`;
    console.log(combinedId);

    toggleButtonText(target);
    setActiveReplyId(prev => (prev === combinedId ? null : combinedId));
  };

  // 대댓글 보기
  const handleReplayView = (event: MouseEvent<HTMLDivElement>, groupId: number) => {
    setVisibleReplies(prev =>
      prev.includes(groupId) ? prev.filter(id => id !== groupId) : [...prev, groupId]
    );
  };


  // 댓글 등록
  const handleReplaySubmit = (event: MouseEvent<HTMLButtonElement>, commentId: number, groupId: number, replayContent: string) => {
    console.log(`Reply to comment ${commentId} in group ${groupId}: ${replayContent}`);

    const combinedId = `${commentId}-${groupId}`;
    console.log(combinedId);
    const target = event.currentTarget as HTMLButtonElement;

    // API 호출


    // API Success Code
    toggleButtonText(target);
    setActiveReplyId(null);
  }

  return (
    <Container>
      <ul className="comment-list">
        {comments.filter(comment => comment.depth === 0 || visibleReplies.includes(comment.groupId))
          .map(comment => (
          <Item key={`${comment.commentId}-${comment.groupId}`} $depth={comment.depth}>
            <ItemGroup>
              {comment.depth > 0 && (
                <CommentReplyBox/>
              )}
              <div style={{width : "100%"}}>
                <div className="header">
                  <div className="left">
                    <img className="avatar" src={comment.avatar} />
                    <p className="writer">{comment.username}</p>
                    <span className="timestamp">{timeDifference(comment.timestamp)}</span>
                  </div>

                  <div className="right">
                    <button className="btn">
                      <AiOutlineLike fontSize={20} />
                      {comment.likeCount}
                    </button>
                    <button className="btn">
                      <AiOutlineDislike fontSize={20} />
                      {comment.disLikeCount}
                    </button>
                  </div>
                </div>

                {comment.mentionedUser && (<div className="mentionedUser">@{comment.mentionedUser}</div>)}

                <div className="comment">{comment.comment}</div>

                <ReplayButtons>
                  {comment.replyCount > 0 && comment.depth === 0 && !visibleReplies.includes(comment.groupId) && (
                    <Replies onClick={(event) => handleReplayView(event, comment.groupId)}>
                      댓글보기({comment.replyCount})
                    </Replies>
                  )}
                  {comment.depth === 0 && visibleReplies.includes(comment.groupId) && (
                    <Replies onClick={(event) => handleReplayView(event, comment.groupId)}>
                      댓글닫기
                    </Replies>
                  )}
                  <ReaplyAdd
                    onClick={(event) => handleAction(event, comment.commentId, comment.groupId)}
                    $isComment={comment.replyCount > 0 && comment.depth === 0}
                  >
                    댓글달기
                  </ReaplyAdd>
                  {comment.isRole && (
                    <ReaplyDelete>
                      댓글삭제
                    </ReaplyDelete>
                  )}
                </ReplayButtons>
                {activeReplyId === `${comment.commentId}-${comment.groupId}` && (
                  <ReplayInput
                    handelCancelAction={(event) => handleReplayAction(event, comment.commentId, comment.groupId)}
                    onClick={(event, replayContent: string) => handleReplaySubmit(event, comment.commentId, comment.groupId, replayContent)}
                    commentId={comment.commentId}
                  />
                )}
              </div>
            </ItemGroup>
          </Item>
        ))}
      </ul>
    </Container>
  );
}

export default CommentList;

const ItemGroup = styled.div`
  display: flex;
`;

const Item = styled.li<{ $depth: number }>`
    overflow-wrap: break-word;
    margin-left: ${({ $depth }) => $depth > 0 ? `${Math.min((2 * $depth - 1) * 40, 200)}px` : '0px'};
    
    & + li {
        margin-top: 25px;
    }

    .header {
        display: flex;
        justify-content: space-between;

        .left {
            display: flex;
            align-items: center;
        }

        .right {
            display: flex;
            align-items: center;
        }

        .avatar {
            margin-right: 5px;
            border-radius: 100%;
        }

        .writer {
            margin-right: 5px;
            font-size: 15px;
            font-weight: 700;
        }

        .timestamp {
            font-size: 13px;
            padding-left: 5px;
        }

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      outline: none;
      background-color: transparent;
      font-size: 15px;
    }
  }
    
  .mentionedUser {
    display: inline-block;
    padding-right: 5px;
    font-weight: 800;
  }

  .comment {
    display: inline-block;
    margin-top: 15px;
  }
`;

const CommentReplyBox = styled.div`
  display: inline-block;
  width: 30px;
  height: 60px;
  border-bottom: 2px solid #8D8BA7;
  border-left: 2px solid #8D8BA7;
  margin-right: 10px;
`;

const ReplayButtons = styled.div`
  display: flex;
  padding-top: 15px;
  font-size: 15px;
`;

const Replies = styled.div`
  display: inline-block;
  border: 1px solid #000000;
  border-radius: 7px;
  padding: 7px;
`;

const ReaplyAdd = styled.div<{ $isComment: boolean }>`
  display: inline-block;
  margin-left: ${(props) => (props.$isComment ? '10px' : '0px')};
  border: 1px solid #000000;
  border-radius: 7px;
  padding: 7px;
`;

const ReaplyDelete = styled.div`
  display: inline-block;
  border: 1px solid #000000;
  border-radius: 7px;
  padding: 7px;
  margin-left: auto;
`;