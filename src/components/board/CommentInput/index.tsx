import TextareaAutosize from 'react-textarea-autosize';
import { BiRightArrowAlt } from 'react-icons/bi';
import { Form } from './styles';

function CommentInput() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <TextareaAutosize style={{ width: '100%' }} cacheMeasurements minRows={4} maxRows={10} />
      <button>
        등록
        <BiRightArrowAlt />
      </button>
    </Form>
  );
}

export default CommentInput;
