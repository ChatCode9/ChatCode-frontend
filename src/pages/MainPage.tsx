import styled from 'styled-components';
import Slider from '../components/main/Slider';
import Navbar from '../components/NavBar';
import PickFlow from '../components/board/PickFlow';
import RecentPostsAndThumbnails from '../components/main/RecentPostsAndThumbnails';
import Topic from '../components/main/Topic';

const MainPage: React.FC = () => {
  const pickFlowProps = {
    justifyContent: 'space-between',
    margin: '100px',
    border: '1px solid #8D8BA7',
    borderRadius: '10px',
    padding: '20px',
    textAlign: 'left',
    color: '#353E5C',
    fontSize: '35px',
    fontWeight: 'bold',
    width: '1254px',
  };
  return (
    <>
      <Navbar />
      <Slider />
      <MainContent>
        <PickFlow {...pickFlowProps} />
        <RecentPostsAndThumbnails />
        <Topic />
      </MainContent>
    </>
  );
};
export default MainPage;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* width: 1200px;
  height: 100%; */
`;
