import styled from 'styled-components';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import FavoriteIcon from '@mui/icons-material/Favorite';

function PostStats() {
  return (
    <StatsWrapper>
      <h2>Post Stats</h2>
      <StatsBox>
        <ContentBox>
          <VisibilityIcon style={{ fontSize: '62px' }} />
          <p style={{ fontSize: '20px' }}>Views</p>
          <p style={{ fontSize: '28px', fontWeight: '500' }}>102</p>
        </ContentBox>
        <ContentBox>
          <CheckBoxIcon style={{ fontSize: '62px' }} />
          <p style={{ fontSize: '20px' }}>Views</p>
          <p style={{ fontSize: '28px', fontWeight: '500' }}>102</p>
        </ContentBox>
        <ContentBox>
          <FavoriteIcon style={{ fontSize: '62px' }} />
          <p style={{ fontSize: '20px' }}>Views</p>
          <p style={{ fontSize: '28px', fontWeight: '500' }}>102</p>
        </ContentBox>
      </StatsBox>
    </StatsWrapper>
  );
}
export default PostStats;
const StatsWrapper = styled.div`
  width: 100%;
  height: 350px;
  background-color: #5d5a88;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    width: 360px;
    height: 48px;
    font-size: 40px;
    font-weight: bold;
    margin-left: 200px;
  }
`;
const StatsBox = styled.div`
  width: 680px;
  height: 268px;
  display: flex;
  margin-right: 100px;
  align-items: center;
  justify-content: center;
`;
const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
  height: 228px;
  margin-right: 80px;
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 36px;
    margin-top: 30px;
  }
`;
