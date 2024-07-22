import { BiRightArrowAlt } from 'react-icons/bi';
import { Container } from './styles';
import React, { useEffect, useState } from 'react';
interface ActionButtonsProps {
  onCancel: () => void;
  onSave: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onUpdate: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
  editVisible: boolean;
}
function ActionButtons({ onCancel, onSave, onUpdate, onDelete, editVisible }: ActionButtonsProps) {
  // 수정 페이지 진입시 저장 버튼이 나왔다가 사라짐
  // 원인은 랜더링이 너무 빨라서 딜레이가 필요해보임
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100); // 딜레이 조정 (단위 : milliseconds)

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <Container>
      <button className="btn-save" type="button" onClick={onCancel}>
        취소
      </button>
      <button className="btn-save" type="button" onClick={onSave}>
        임시저장
      </button>
      {!editVisible && (
        <button className="btn-post" type="submit">
          저장
          <BiRightArrowAlt />
        </button>
      )}
      {editVisible && (
        <button className="btn-delete" type="button" onClick={onDelete}>
          삭제
        </button>
      )}
      {editVisible && (
        <button className="btn-post" type="button" onClick={onUpdate}>
          수정
          <BiRightArrowAlt />
        </button>
      )}
    </Container>
  );
}

export default ActionButtons;
