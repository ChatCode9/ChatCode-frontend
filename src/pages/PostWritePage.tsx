import React, { useState } from 'react';
import styled from 'styled-components';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { BiRightArrowAlt } from 'react-icons/bi';
import Editor from '../components/Editor';

function PostWritePage() {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [tags, SetTags] = useState<string[]>([]);
  const [content, setContent] = useState('');

  const handleMainChange = (e: SelectChangeEvent) => {
    setCategory(e.target.value as string);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTagsChange = (_: React.SyntheticEvent, value: string[]) => {
    SetTags(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({
      category,
      title,
      tags,
      content,
    });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Header>
          <SelectWrapper>
            <FormControl fullWidth size="medium">
              <InputLabel>게시판 선택</InputLabel>
              <Select label="게시판 선택" value={category} onChange={handleMainChange}>
                <MenuItem value={'question'}>Q&A</MenuItem>
                <MenuItem value={'free'}>자유</MenuItem>
              </Select>
            </FormControl>
          </SelectWrapper>

          <TextField fullWidth placeholder="제목" value={title} onChange={handleTitleChange} />

          <TagAutocompleteWrapper>
            <Autocomplete
              multiple
              options={['javascript', 'react', 'python', 'Node.js']}
              renderInput={(params) => <TextField {...params} placeholder="태그" />}
              value={tags}
              onChange={handleTagsChange}
            />
          </TagAutocompleteWrapper>
        </Header>

        <EditorWrapper>
          <Editor content={content} setContent={setContent} />
        </EditorWrapper>

        <ButtonWrapper>
          <button className="btn-save" type="button">
            Save
          </button>
          <button className="btn-post">
            Post
            <BiRightArrowAlt />
          </button>
        </ButtonWrapper>
      </Form>
    </Container>
  );
}

export default PostWritePage;

const Container = styled.div`
  padding-bottom: 100px;
`;

const Form = styled.form`
  max-width: 856px;
  margin: 0 auto;
  padding-top: 100px;
`;

const Header = styled.header``;

const SelectWrapper = styled.div`
  display: flex;
  max-width: 300px;
  margin-bottom: 10px;

  .MuiFormControl-root + .MuiFormControl-root {
    margin-left: 20px;
  }
`;

const TagAutocompleteWrapper = styled.div`
  margin-top: 10px;
`;

const EditorWrapper = styled.div`
  margin-top: 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 70px;

  button {
    font-size: 16px;
    outline: none;
    border-radius: 8px;
    padding: 10px 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button + button {
    margin-left: 10px;
  }

  .btn-save {
    background-color: #f8faff;
    color: #6d758f;
    border: 1px solid #e1e4ed;
  }

  .btn-post {
    background-color: #6d758f;
    border: none;
    color: #fff;
  }
`;
