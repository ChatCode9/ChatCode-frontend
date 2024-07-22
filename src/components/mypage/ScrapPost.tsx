import { useState } from 'react';
import styled from 'styled-components';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import postsData from '../../data/posts.json';
import { useMyInfoQuery } from '../../hooks/api/useMyInfoQuery';
import { useScrapsQuery } from '../../hooks/api/useScrapsQuery';
import { formatDate } from '../../utils/formatDate';

function ScrapPost() {
  const { data: myInfoData } = useMyInfoQuery();
  const { scrapsData } = useScrapsQuery({ id: myInfoData.data.id });
  const [isRemoveList, setIsRemoveList] = useState(postsData.map(() => true));
  const [isRemoveButtonVisible, setIsRemoveButtonVisible] = useState(postsData.map(() => false));

  console.log(isRemoveList);

  const handleRemoveList = (index: number) => {
    const newList = [...isRemoveList];
    newList[index] = !newList[index];
    setIsRemoveList(newList);
  };

  const handleRemoveBtn = (index: number) => {
    const newList = [...isRemoveButtonVisible];
    newList[index] = !newList[index];
    setIsRemoveButtonVisible(newList);
  };

  return (
    <ScrapWrapper>
      {scrapsData?.data?.map(
        (list, index) =>
          isRemoveList[index] && (
            <BoardBox>
              <ContentBox>
                <h1>{list.articleTitle}</h1>
                <p>{formatDate(list.dateCreated)}</p>
              </ContentBox>
              <MoreBtnBox>
                <button
                  onClick={() => {
                    handleRemoveBtn(index);
                  }}
                >
                  <MoreVertIcon />
                </button>
                {isRemoveButtonVisible[index] ? (
                  <RemoveBtn onClick={() => handleRemoveList(index)}>스크랩 제거</RemoveBtn>
                ) : null}
              </MoreBtnBox>
            </BoardBox>
          ),
      )}
    </ScrapWrapper>
  );
}
export default ScrapPost;

const ScrapWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 483px;
  height: 358px;
  border: 1px solid #bcbacd;
  h1,
  div {
    width: 396px;
    height: 32px;
    font-weight: 600;
    margin-top: 10px;
  }
  p {
    width: 400px;
    height: 216px;
  }
  span {
    width: 42px;
    height: 16px;
    border-radius: 2px;
    margin-right: 10px;
    border: 1px solid #bcbabc;
    padding: 5px;
    font-weight: 500;
  }
`;
const BoardBox = styled.div`
  display: flex;
  width: 590px;
  height: 400px;
  margin: 30px;
`;
const MoreBtnBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 107px;
  height: 100px;
  margin-left: 10px;
  button {
    display: flex;
    justify-content: flex-start;
    background-color: transparent;
    border: none;
    color: #bcbacd;
    &:hover {
      color: black;
    }
  }
`;
const RemoveBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 95px;
  height: 27px;
  background-color: none;
  border: 1px solid #8d8ba7;
  margin-top: 20px;
  font-weight: 600;
  &:hover {
    background-color: #8d8ba7;
    color: #ffff;
  }
`;
