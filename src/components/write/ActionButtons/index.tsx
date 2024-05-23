import { BiRightArrowAlt } from 'react-icons/bi';
import { Container } from './styles';

function ActionButtons() {
  return (
    <Container>
      <button className="btn-save" type="button">
        Save
      </button>
      <button className="btn-post">
        Post
        <BiRightArrowAlt />
      </button>
    </Container>
  );
}

export default ActionButtons;
