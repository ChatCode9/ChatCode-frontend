import TextareaAutosize from 'react-textarea-autosize';
import Editor from '../../Editor';
import { BiRightArrowAlt } from 'react-icons/bi';
import { Form } from './styles';

interface Props {
  type: 'textarea' | 'editor';
}

function CommentInput({ type }: Props) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmit} $type={type}>
      {type === 'textarea' && <TextareaAutosize style={{ width: '100%' }} cacheMeasurements minRows={4} maxRows={10} />}
      {type === 'editor' && (
        <div className="editor">
          <Editor content="" setContent={() => {}} width={'100%'} height={'100px'} />
        </div>
      )}
      <div className="btn-wrapper">
        <button className="btn-submit">
          등록
          <BiRightArrowAlt />
        </button>
      </div>
    </Form>
  );
}

export default CommentInput;
