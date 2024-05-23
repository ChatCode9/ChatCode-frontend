import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import Editor from '../../Editor';
import { BiRightArrowAlt } from 'react-icons/bi';
import { Form } from './styles';

interface Props {
  type: 'textarea' | 'editor';
}

function CommentInput({ type }: Props) {
  const [value, setValue] = useState('');
  let content;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  if (type === 'textarea') {
    content = (
      <>
        <TextareaAutosize
          style={{ width: '100%' }}
          cacheMeasurements
          minRows={4}
          maxRows={10}
          value={value}
          onChange={handleChange}
        />
        <div className="btn-wrapper">
          <button className="btn-submit">
            등록
            <BiRightArrowAlt />
          </button>
        </div>
      </>
    );
  }

  if (type === 'editor') {
    content = (
      <>
        <div className="editor">
          <Editor content={value} setContent={setValue} width={'100%'} height={'100px'} />
          <button className="btn-submit top">
            등록
            <BiRightArrowAlt fontSize={20} />
          </button>
        </div>
      </>
    );
  }

  return <Form onSubmit={handleSubmit}>{content}</Form>;
}

export default CommentInput;
