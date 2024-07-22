import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { useState, useEffect } from 'react';

import { useTagsQuery } from '../../hooks/api/useTagsQuery';
import { useDeleteTagMutation } from '../../hooks/api/useDeleteTagMutation';
import { tagState } from '../../atoms/userInfoState';
import { usePostTagMutation } from '../../hooks/api/usePostTagMutation';
import { usePutTagMutation } from '../../hooks/api/usePutTagMutation';
import { useUserTagsQuery } from '../../hooks/api/useUserTagsQuery';
import { clickedListState } from '../../atoms/userInfoState';

interface Tag {
  id: number;
  name: string;
}
function UserTag() {
  //admin api 작업
  const [tagName, setTagName] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useRecoilState<number[]>(tagState);
  const [clickedList, setClickedList] = useRecoilState(clickedListState);

  const { data } = useTagsQuery();
  const { data: userTags } = useUserTagsQuery();
  const { mutate: postTagMutate } = usePostTagMutation();
  const { mutate: putTagMutate } = usePutTagMutation();
  const { mutate: DeleteTagMutate } = useDeleteTagMutation();

  const handleClick = (index: number): void => {
    const updatedList = [...clickedList];
    const selectedTag = tagName[index];

    const selectedCount = updatedList.filter((item) => item).length;

    if (!updatedList[index] && selectedCount >= 6) {
      alert('6개까지만 선택 가능합니다.');
      return;
    }
    updatedList[index] = !updatedList[index];
    setClickedList(updatedList);

    if (updatedList[index]) {
      setSelectedTags([...selectedTags, selectedTag.id]);
    } else {
      setSelectedTags(selectedTags.filter((tagId) => tagId !== selectedTag.id));
    }
  };

  useEffect(() => {
    const interest_tag = [{ name: 'New Tag1' }];
    postTagMutate(interest_tag);
  }, [postTagMutate]);

  useEffect(() => {
    const updatedTag = [{ id: 1, name: 'frontend' }];
    putTagMutate(updatedTag);
  }, [putTagMutate]);

  useEffect(() => {
    const tagIdToDelete = 36;
    DeleteTagMutate(tagIdToDelete);
  }, [DeleteTagMutate]);

  // 태그 전체 목록 불러오기
  useEffect(() => {
    if (data) {
      setTagName(data.data);
      setClickedList(Array(data.data.length).fill(false));
    }
  }, [data]);

  useEffect(() => {
    if (userTags) {
      const initialClickedList = tagName.map((tag) => userTags.data.some((userTag: Tag) => userTag.id === tag.id));
      setClickedList(initialClickedList);
      setSelectedTags(userTags.data.map((tag: Tag) => tag.id));
    }
  }, [userTags, tagName, setClickedList, setSelectedTags]);

  return (
    <>
      <SignupInfoBox>회원님의 관심사에 대해 알려주세요</SignupInfoBox>
      <p style={{ height: '15px', color: '#6D758F' }}>
        프로필 또는 질문게시판에 작성 시 표기되며, 프로필 편집에서 수정 가능합니다.
      </p>

      <TagContainer>
        {tagName.map((tag, index) => (
          <li key={tag.id}>
            <TagButton
              onClick={() => handleClick(index)}
              style={{
                backgroundColor: clickedList[index] ? '#5D5A88' : '#ffff',
                color: clickedList[index] ? '#ffff ' : '#353E5C',
              }}
            >
              {tag.name}
            </TagButton>
          </li>
        ))}
      </TagContainer>
    </>
  );
}
export default UserTag;

const SignupInfoBox = styled.div`
  display: flex;
  width: 448px;
  height: 20px;
  align-items: center;
  color: #5d5a88;
  font-size: 12px;
  margin: 60px 0 50px 0;

  &::before,
  &::after {
    content: '';
    flex-grow: 1;
    background: #5d5a88;
    height: 1px;
    font-size: 12px;
    line-height: 0px;
    margin: 0px 16px;
  }
`;

const TagContainer = styled.ul`
  width: 448px;
  height: auto;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row;
  flex-wrap: wrap;
  li {
    display: flex;
    justify-content: space-evenly;
    width: 79px;
    height: 28px;
    margin: 10px;
  }
`;
const TagButton = styled.button`
  background-color: #ffff;
  color: black;
  font-size: 14px;
  border: 1px solid #5d5a88;
  border-radius: 10px;
  padding: 5px 10px;
  white-space: nowrap;
`;
