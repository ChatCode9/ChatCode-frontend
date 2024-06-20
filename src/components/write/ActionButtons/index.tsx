import { BiRightArrowAlt } from 'react-icons/bi';
import { Container } from './styles';

function ActionButtons({ onCancel, onSave, onSubmit, onUpdate, editVisible }) {
  return (
    <Container>
      <button
        className="btn-save"
        type="button"
        onClick={onCancel}
      >
        취소
      </button>
      <button
        className="btn-save"
        type="button"
        onClick={onSave}
      >
        임시저장
      </button>
      {!editVisible && (
        <button
          className="btn-post"
          type="button"
          onClick={onSubmit}
        >
          저장
          <BiRightArrowAlt />
        </button>
      )}
      {editVisible && (
        <button
          className="btn-post"
          type="button"
          onClick={onUpdate}
        >
          수정
          <BiRightArrowAlt />
        </button>
      )}
    </Container>
  );
}

export default ActionButtons;
