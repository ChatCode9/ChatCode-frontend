import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';

import Editor from '../components/Editor';
import CategorySelect from '../components/write/CategorySelect';
import TagAutocomplete from '../components/write/TagAutocomplete';
import ActionButtons from '../components/write/ActionButtons';
import Navbar from '../components/header/NavBar.tsx';
import { NotificationToast } from '../components/modal/NotificationToast.tsx';
import { getPost } from '../services/post/getPost.ts';
import { useToastControl } from '../hooks/useToastControl.ts';
import { usePostArticle } from '../hooks/api/usePostArticle.ts';
import { usePutArticle } from '../hooks/api/usePutArticle.ts';
import { useDeleteArticle } from '../hooks/api/useDeleteArticle.ts';

interface PostData {
  title: string;
  tags: string[];
  content: string;
}

function PostWritePage() {
  const { hideToast } = useToastControl();
  const [category, setCategory] = useState<'question' | 'free'>('question');
  const [title, setTitle] = useState('');
  const [tagList, setTagList] = useState<string[]>([]);
  const [content, setContent] = useState('');

  const navigate = useNavigate();

  const { postId } = useParams();
  const [editData, setEditData] = useState<PostData>();
  const [editVisible, setEditVisible] = useState(false);

  const { createMutate } = usePostArticle();
  const { updateMutate } = usePutArticle();
  const { deleteMutate } = useDeleteArticle();

  // postId 데이터 있으면 한 번 실행
  // edit 로 들어오는 경우
  useEffect(() => {
    if (postId) {
      // 게시글 데이터 호출
      (async () => {
        const response = await getPost(Number(postId));
        console.log(response);
        if (response && response.data) {
          setEditData(response.data);
        }
      })();
    }
  }, [postId]);

  // 글 수정 데이터 있으면 수정 에디터 폼으로 변경
  useEffect(() => {
    if (editData) {
      setCategory('question');
      setTitle(editData.title);
      setTagList(editData.tags);
      setContent(editData.content);
      setEditVisible(true);
    }
  }, [editData]);

  const handleCategoryChange = (category: 'question' | 'free') => {
    setCategory(category);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTagListChange = (tagList: string[]) => {
    setTagList(tagList);
  };

  // 취소
  const handelCancel = () => {
    navigate('/board/question');
  };

  // 임시저장
  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // 저장
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createMutate({ category: category, title: title, tagList: tagList, contentText: JSON.stringify(content) });
  };

  // 수정
  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updateData = {
      category: category,
      title: title,
      tagList: tagList,
      contentText: JSON.stringify(content),
    };
    updateMutate({ postId: Number(postId), updateArticle: updateData });
  };

  // 삭제
  const handleDelete = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    deleteMutate(Number(postId));
  };

  return (
    <Container>
      <Navbar />
      <Form onSubmit={handleSubmit}>
        <Header>
          <CategorySelect category={category} onCategoryChange={handleCategoryChange} />
          <TextField fullWidth placeholder="제목" value={title} onChange={handleTitleChange} />
          <TagAutocomplete tagList={tagList} onTagListChange={handleTagListChange} />
        </Header>
        <Editor content={content} setContent={setContent} />
        <ActionButtons
          onCancel={handelCancel}
          onSave={() => handleSave}
          onSubmit={() => handleSubmit}
          onUpdate={() => handleUpdate}
          onDelete={() => handleDelete}
          editVisible={editVisible}
        />
      </Form>
      <NotificationToast onClose={hideToast} />
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
