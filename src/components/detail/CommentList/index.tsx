import { Container } from './styles';
import { AiOutlineDislike, AiOutlineLike, AiFillLike, AiFillDislike } from 'react-icons/ai';
import styled from 'styled-components';
import { timeDifference } from '../../../utils/timeDifference.ts';
import ReplayInput from '../ReplayInput';
import { MouseEvent, useRef, useState } from 'react';
import ModalCustom1 from '../../modal/ModalCustom1.tsx';

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
  isLiked: boolean | null;
  isRole: boolean;
}

interface Props {
  comments: CommentType[];
}

function CommentList({ comments }: Props) {
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [visibleReplies, setVisibleReplies] = useState<number[]>([]);
  const prevButtonRef = useRef<HTMLDivElement | HTMLButtonElement | null>(null);

  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [deleteCommentId, setDeleteCommentId] = useState<number | null>(null);

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


  // 댓글 등록 버튼 누를시 실행될 함수
  const handleReplaySubmit = (event: MouseEvent<HTMLButtonElement>, commentId: number, groupId: number, replayContent: string) => {
    console.log(`Reply to comment ${commentId} in group ${groupId}: ${replayContent}`);

    const combinedId = `${commentId}-${groupId}`;
    console.log(combinedId);
    const target = event.currentTarget as HTMLButtonElement;

    // API 호출
    console.log(`handleReplaySubmit API CALL`)

    // API Success Code
    toggleButtonText(target);
    setActiveReplyId(null);
  }

  // 댓글 좋아요/싫어요 클릭시 실행될 함수
  const handleLikeSubmit = (commentId: number, isLiked: boolean | null, actionLiked: boolean) => {
    console.log(`commentId : ${commentId}, isLiked : ${isLiked}, actionLiked : ${actionLiked}`)

    if(isLiked === null){
      // API 호출
      console.log(`handleLikeSubmit API CALL`)

    } else {
      console.log(`이미 좋아요 및 싫어요 버튼을 눌렀습니다`)
    }
  }

  // 댓글 삭제 클릭시 실행될 함수
  const handleDeleteSubmit = (commentId: number) => {
    console.log(`commentId : ${commentId}`);
    setDeleteCommentId(commentId);
    setIsSecondModalOpen(true);
  }

  // 댓글 삭제 확인 누르면 실행될 함수
  const handleSecondModalConfirm = () => {
    console.log('Second modal confirmed');
    console.log(`삭제할 댓글 번호 : ${deleteCommentId}`);
    // 댓글 삭제 API 호출
    console.log(`handleSecondModalConfirm API CALL`)

    setIsSecondModalOpen(false);
  };

  return (
    <Container>
      <ul className="comment-list">
        {comments.filter(comment => comment.depth === 0 || visibleReplies.includes(comment.groupId))
          .map(comment => (
            <Item key={`${comment.commentId}-${comment.groupId}`} $depth={comment.depth}>
              <ItemGroup>
                {comment.depth > 0 && (
                  <CommentReplyBox />
                )}
                <div style={{ width: '100%' }}>
                  <div className="header">
                    <div className="left">
                      <img className="avatar" src={comment.avatar} />
                      <p className="writer">{comment.username}</p>
                      <span className="timestamp">{timeDifference(comment.timestamp)}</span>
                    </div>

                    <div className="right">
                      <button className="btn"
                              onClick={() => handleLikeSubmit(comment.commentId, comment.isLiked, true)}>
                        {comment.isLiked === true ? <AiFillLike fontSize={20} /> : <AiOutlineLike fontSize={20} />}
                        {comment.likeCount}
                      </button>
                      <button className="btn"
                              onClick={() => handleLikeSubmit(comment.commentId, comment.isLiked, false)}>
                        {comment.isLiked === false ? <AiFillDislike fontSize={20} /> :
                          <AiOutlineDislike fontSize={20} />}
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
                      <ReaplyDelete onClick={() => handleDeleteSubmit(comment.commentId)}>
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

      {/*<SolveModal onConfirm={handleConfirm} />*/}

      <div>
        <ModalCustom1
          isOpen={isSecondModalOpen}
          onClose={() => setIsSecondModalOpen(false)}
          onConfirm={handleSecondModalConfirm}
        >
          <h3>댓글을 정말 삭제하시겠습니까?</h3>
          <p>*재복구 불가합니다.</p>
        </ModalCustom1>
      </div>

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