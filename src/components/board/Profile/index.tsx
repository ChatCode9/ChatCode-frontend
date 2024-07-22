import styled from 'styled-components';

interface Props {
  avatar?: string;
  timeline: string;
  nickname?: string;
}

function Profile({ avatar, timeline, nickname }: Props) {
  return (
    <Container>
      <ProfileImage className="avatar" src={avatar} alt={nickname} />
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

const ProfileImage = styled.img`
  width: 37px;
  height: 37px;
  background-color: #5d5a88;
  border-radius: 100%;
  margin-right: 10px;
`;
