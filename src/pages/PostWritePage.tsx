import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Editor from '../components/Editor';
import CategorySelect from '../components/write/CategorySelect';
import TagAutocomplete from '../components/write/TagAutocomplete';
import ActionButtons from '../components/write/ActionButtons';
import { createNewArticle } from '../services/http';

function PostWritePage() {
  const [category, setCategory] = useState<'question' | 'free' | undefined>();
  const [title, setTitle] = useState('');
  const [tagList, setTagList] = useState<string[]>([]);
  const [content, setContent] = useState('');

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewArticle,
    onSuccess: () => {
      console.log('성공!');
    },
  });

  const handleCategoryChange = (category: 'question' | 'free') => {
    setCategory(category);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTagListChange = (tagList: string[]) => {
    setTagList(tagList);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate({ title, contentText: content });

    console.log({
      category,
      title,
      tagList,
      content,
    });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Header>
          <CategorySelect category={category} onCategoryChange={handleCategoryChange} />
          <TextField fullWidth placeholder="제목" value={title} onChange={handleTitleChange} />
          <TagAutocomplete tagList={tagList} onTagListChange={handleTagListChange} />
        </Header>
        <Editor content={content} setContent={setContent} />
        <ActionButtons />
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

const Header = styled.header`
  margin-bottom: 10px;
`;
