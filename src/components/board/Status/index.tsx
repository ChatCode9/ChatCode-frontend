import styled from 'styled-components';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';

interface Props {
  viewCount: number;
  commentCount: number;
  likeCount: number;
}

function Status({ viewCount, commentCount, likeCount }: Props) {
  return (
    <Container>
      <Wrapper>
        <PeopleOutlineOutlinedIcon />
        {viewCount}
      </Wrapper>
      <Wrapper>
        <SmsOutlinedIcon />
        {commentCount}
      </Wrapper>
      <Wrapper>
        <ThumbUpOutlinedIcon />
        {likeCount}
      </Wrapper>
    </Container>
  );
}

export default Status;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 10px;
`;
