import styled from 'styled-components';

interface Props {
  avatar?: string;
  timeline: string;
  nickname: string;
}

function Profile({ /*avatar,*/ timeline, nickname }: Props) {
  // console.log(avatar);

  return (
    <Container>
      <ProfileImage />
      <div className="inner">
        <span className="timeline">{timeline}</span>
        <p className="nickname">{nickname}</p>
      </div>
    </Container>
  );
}

export default Profile;

const Container = styled.div`
  display: flex;
  align-items: center;

  .time {
    font-size: 12px;
  }

  .nickname {
    font-weight: 700;
    margin-top: 5px;
  }
`;

const ProfileImage = styled.div`
  width: 37px;
  height: 37px;
  background-color: #5d5a88;
  border-radius: 100%;
  margin-right: 10px;
`;
