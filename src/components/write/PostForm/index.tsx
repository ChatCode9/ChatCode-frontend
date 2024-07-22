import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import styled from 'styled-components';

import Editor from '../../Editor';
import ActionButtons from '../ActionButtons';
import CategorySelect from '../CategorySelect';
import TagAutocomplete from '../TagAutocomplete';
import { useDeleteArticleMutation } from '../../../hooks/api/useDeleteArticleMutation';
import { usePostArticleMutation } from '../../../hooks/api/usePostArticleMutation';
import { usePutArticleMutation } from '../../../hooks/api/usePutArticleMutation';
import { CategoriesStatus } from '../../../types/filter';
import { FILTERS_CATEGORIES_LIST } from '../../../constants/filters';
import { getPost } from '../../../services/post/getPost';

interface PostFormProps {
  postId?: number;
}

const PostForm = ({ postId }: PostFormProps) => {
  const navigate = useNavigate();
  const [category, setCategory] = useState<CategoriesStatus>(FILTERS_CATEGORIES_LIST.QUESTION);
  const [title, setTitle] = useState<string>('');
  const [tagList, setTagList] = useState<string[]>([]);
  const [content, setContent] = useState<string>('');
  const [editVisible, setEditVisible] = useState(false);

  const { createMutate } = usePostArticleMutation();
  const { updateMutate } = usePutArticleMutation();
  const { deleteMutate } = useDeleteArticleMutation();

  const handleCategoryChange = (category: CategoriesStatus) => {
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
    navigate(-1);
  };

  // 임시저장
  const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  // 저장
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const categoryId = category === FILTERS_CATEGORIES_LIST.FREE ? 1 : 2;
    createMutate({ categoryId: categoryId, title: title, tags: tagList, contentText: content });
  };

  // 수정
  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const categoryId = category === FILTERS_CATEGORIES_LIST.FREE ? 1 : 2;
    const updateData = {
      categoryId: categoryId,
      title: title,
      tags: tagList,
      contentText: JSON.stringify(content),
    };
    updateMutate({ postId: Number(postId), updateArticle: updateData });
    console.log('수정');
    navigate(-1);
  };

  // 삭제
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    deleteMutate(Number(postId));
  };

  // postId 데이터 있으면 한 번 실행
  // edit 로 들어오는 경우
  useEffect(() => {
    if (postId) {
      // 게시글 데이터 호출
      (async () => {
        const response = await getPost(Number(postId));
        console.log(response);
        if (response && response.data) {
          setTitle(response.data.title);
          setTagList(response.data.tags);
          setContent(response.data.content);
          setEditVisible(true);
        }
      })();
    }
  }, [postId]);

  return (
    <Form onSubmit={handleSubmit}>
      <Header>
        <CategorySelect category={category} onCategoryChange={handleCategoryChange} />
        <TextField fullWidth placeholder="제목" value={title} onChange={handleTitleChange} />
        <TagAutocomplete tagList={tagList} onTagListChange={handleTagListChange} />
      </Header>
      <Editor content={content} setContent={setContent} />
      <ActionButtons
        onCancel={handelCancel}
        onSave={handleSave}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        editVisible={editVisible}
      />
    </Form>
  );
};

export default PostForm;

const Form = styled.form`
  max-width: 856px;
  margin: 0 auto;
  padding-top: 100px;
`;

const Header = styled.header`
  margin-bottom: 10px;
`;
