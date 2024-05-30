import { useState } from 'react';
import styled from 'styled-components';
import ScrapPost from './mypage/ScrapPost';

function Tabs() {
  const menuArr = [
    {
      name: 'Post',
      content: '안녕',
      imgPath: '../../public/PostTab.svg',
    },
    {
      name: 'Question',
      content: '안녕2',
      imgPath: '../../public/QuestionTab.svg',
    },
    {
      name: 'Scrap',
      content: <ScrapPost />,
      imgPath: '../../public/ScrapTab.svg',
    },
  ];
  const [currentTab, clickTab] = useState(0);
  const selectMenuHandler = (index: number) => {
    clickTab(index);
  };
  return (
    <div>
      <TabsWrapper>
        <ul>
          {menuArr.map((tab, index) => (
            <li
              key={index}
              className={index === currentTab ? 'submenu focused' : 'submenu'}
              onClick={() => selectMenuHandler(index)}
            >
              {index === currentTab ? (
                <span className="tab-icon">
                  <img src={tab.imgPath} alt={tab.name} />
                </span>
              ) : (
                <>
                  <TabBox>{tab.name}</TabBox>
                </>
              )}
            </li>
          ))}
        </ul>
      </TabsWrapper>
      <p>{menuArr[currentTab].content}</p>
    </div>
  );
}
export default Tabs;
const TabBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 700;
  padding: 5px;
  width: 100px;
  height: 45px;
  background-color: #bcbacd;
  color: #ffffff;
  margin-top: 10px;
`;

const TabsWrapper = styled.div`
  position: relative;
  bottom: 40px;
  width: auto;
  height: 130px;
  ul {
    display: flex;
    width: 500px;
    margin-left: 30px;
  }
  li {
    margin-right: 10px;
    width: auto;
  }
`;
