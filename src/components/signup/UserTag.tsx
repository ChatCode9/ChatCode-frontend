import styled from 'styled-components';
import { useState } from 'react';

function UserTag() {
  const tagName: string[] = [
    'frontend',
    'backend',
    'embeded',
    'ui&ux',
    'design',
    'web',
    'ios',
    'mobile',
    'ai',
    'game',
    'devops',
    'deep learning',
    'data',
    'desktop',
    'algorithm',
    'native',
    'app',
    'protect',
    'study',
    'beginner',
    'job',
    'hire',
    'employment',
    'conference',
    'job fair',
    'competition',
    'hackathon',
  ];
  const [clickedList, setClickedList] = useState(Array(tagName.length).fill(false));
  const handleClick = (index: number): void => {
    const updatedList = [...clickedList];
    const selectedCount = clickedList.filter((item) => item).length;
    if (!updatedList[index] && selectedCount >= 6) {
      alert('6개까지만 선택 가능합니다.');
      return;
    }
    updatedList[index] = !updatedList[index];
    setClickedList(updatedList);
  };
  return (
    <>
      <SignupInfoBox>회원님의 관심사에 대해 알려주세요</SignupInfoBox>
      <p style={{ height: '15px', color: '#6D758F' }}>
        프로필 또는 질문게시판에 작성 시 표기되며, 프로필 편집에서 수정 가능합니다.
      </p>

      <TagContainer>
        {tagName.map((tagname, index) => (
          <li key={index}>
            <TagButton
              onClick={() => handleClick(index)}
              style={{
                backgroundColor: clickedList[index] ? '#5D5A88' : '#ffff',
                color: clickedList[index] ? '#ffff ' : '#353E5C',
              }}
            >
              {tagname}
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
  height: 288px;
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
  white-space: nowrap; /* 텍스트가 길어도 줄 바꿈 방지 */
`;
