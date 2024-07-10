import { useState } from 'react';
import styled from 'styled-components';
import contests from '../../data/Competition_Dummy_data.json';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type contestData = {
  id: number;
  image: string;
  url: string;
};
function Competition() {
  const [visibleCount, setVisibleCount] = useState(4);
  const [visibleButton, setVisibleButton] = useState(true);

  const handleClick = (url: string) => {
    window.location.href = url;
  };
  const handleAddVisibleCount = () => {
    setVisibleCount((prevCount) => prevCount + 4);
    setVisibleButton(false);
  };
  return (
    <Container>
      <h1 className="title">TODAY’S IT TOPIC</h1>
      <div
        className="img-container"
        style={{
          borderBottom: visibleCount >= contests.length ? '1px solid #8d8ba7' : 'none',
        }}
      >
        {contests.slice(0, visibleCount).map((data: contestData) => (
          <div key={data.id}>
            <img src={data.image} onClick={() => handleClick(data.url)} />
          </div>
        ))}
      </div>
      {contests.length > 4 && visibleButton && (
        <button onClick={handleAddVisibleCount}>
          <ExpandMoreIcon style={{ width: '40px', height: '30px', color: '#5D5A88' }} />
        </button>
      )}
    </Container>
  );
}
export default Competition;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  width: 1254px;
  margin-top: 100px;
  flex-wrap: wrap;

  .img-container {
    display: flex;

    justify-content: space-around;
    flex-wrap: wrap;
    width: 100%;
    height: auto;
    padding-bottom: 40px;
  }
  h1 {
    font-size: 45px;
    font-weight: bold;
    color: #353e5c;
    border-bottom: 1px solid #8d8ba7;
    padding-bottom: 20px;
  }
  div {
    width: 288px;
    height: 408px;

    margin: 10px 10px 10px 10px;
    img {
      border: 1px solid #bcbacd;
      border-radius: 15px;
      width: 288px;
      height: 408px;
      object-fit: cover;
    }
  }
  button {
    height: 36px;
    border-radius: 5px;
    background-color: #ffffff;
    border: 1px solid #5d5a88;
  }
`;
