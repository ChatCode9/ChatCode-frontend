import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Editor from '../components/Editor';
import CategorySelect from '../components/write/CategorySelect';
import TagAutocomplete from '../components/write/TagAutocomplete';
import ActionButtons from '../components/write/ActionButtons';
import { createNewArticle, getPost, updateArticle } from '../services/post';
import Navbar from '../components/NavBar.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { NotificationModal } from '../components/modal/NotificationModal.tsx';

interface PostData {
  title: string;
  tags: string[];
  content: string;
}

function PostWritePage() {
  const [category, setCategory] = useState<'question' | 'free'>('question');
  const [title, setTitle] = useState('');
  const [tagList, setTagList] = useState<string[]>([]);
  const [content, setContent] = useState('');

  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const navigate = useNavigate();

  const { postId } = useParams();
  const [editData, setEditData ] = useState<PostData>();
  const [editVisible, setEditVisible] = useState(false);

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

  // 게시글 생성
  const { mutate: createMutate } = useMutation({
    mutationFn: createNewArticle,
    onSuccess: () => {
      console.log('성공!');
      navigate("/board/question");
    },
    onError: () => {
      setModalMessage('서버 통신 실패');
      setModalVisible(true);
    }
  });

  // 게시글 수정
  const { mutate : updateMutate } = useMutation({
    mutationFn: (
      data: {
        postId: number,
        updateArticle: {
          category: string | undefined;
          title: string;
          tagList: string[];
          contentText: string;
        }
      }) => updateArticle(data.postId, data.updateArticle),
    onSuccess: () => {
      console.log('성공!');
      navigate("/board/question");
    },
    onError: () => {
      setModalMessage('서버 통신 실패');
      setModalVisible(true);
    }
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

  // 취소
  const handelCancel = () => {
    navigate("/board/question");
  }

  // 임시저장
  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // 저장
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createMutate({ category: category, title: title, tagList:tagList, contentText: JSON.stringify(content)});
  };
  
  // 수정
  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updateData = {
      category: category,
      title: title,
      tagList:tagList,
      contentText: JSON.stringify(content)
    }
    updateMutate({ postId: Number(postId), updateArticle: updateData });
  };

  // 모달창 Close 버튼 클릭시 동작 함수
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <Container>
      <Navbar/>
      <Form onSubmit={handleSubmit}>
        <Header>
          <CategorySelect category={category} onCategoryChange={handleCategoryChange} />
          <TextField fullWidth placeholder="제목" value={title} onChange={handleTitleChange} />
          <TagAutocomplete tagList={tagList} onTagListChange={handleTagListChange} />
        </Header>
        <Editor content={content} setContent={setContent} />
        <ActionButtons onCancel={handelCancel} onSave={handleSave} onSubmit={handleSubmit} onUpdate={handleUpdate} editVisible={editVisible} />
      </Form>
      <NotificationModal
        message={modalMessage}
        isVisible={isModalVisible}
        onClose={handleCloseModal}
      />
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
