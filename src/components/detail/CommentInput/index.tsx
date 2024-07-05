import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import Editor from '../../Editor';
import { Form } from './styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import styled from 'styled-components';

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
          minRows={6}
          maxRows={10}
          value={value}
          onChange={handleChange}
        />
        <div className="btn-wrapper">
          {/*<button className="btn-submit">*/}
          {/*  등록*/}
          {/*  <BiRightArrowAlt />*/}
          {/*</button>*/}
          <SubmitButton type="submit">
            <span>등록</span>
            <ArrowForwardIcon sx={{ fontSize: '20px' }} />
          </SubmitButton>
        </div>
      </>
    );
  }

  if (type === 'editor') {
    content = (
      <>
        <div className="editor">
          <Editor content={value} setContent={setValue} width={'100%'} height={'100px'} />
          {/*<button className="btn-submit top">*/}
          {/*  등록*/}
          {/*  <BiRightArrowAlt fontSize={20} />*/}
          {/*</button>*/}
          <SubmitButton type="submit">
            <span>등록</span>
            <ArrowForwardIcon sx={{ fontSize: '20px' }} />
          </SubmitButton>
        </div>
      </>
    );
  }

  return <Form onSubmit={handleSubmit}>{content}</Form>;
}

export default CommentInput;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px 12px;
  background-color: #6d758f;
  border: 1px solid #e1e4ed;
  border-radius: 6px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-left: 15px;
  margin-top: 5px;

  &:hover {
    background-color: #717171;
  }

  span {
    margin-right: 5px;
  }
`;
