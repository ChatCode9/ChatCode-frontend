import { Container } from './styles';

interface UserProfile {
  userId: number;
  userName: string;
  avatar: string;
  tags: string[];
  comment: string;
}

interface WriterProfileProps {
  userProfile: UserProfile;
}

function WriterProfile({ userProfile }: WriterProfileProps) {
  return (
    <Container>
      <div className="inner">
        <img className="avatar" src={userProfile.avatar} alt="프로필 이미지" />
        <div className="info">
          <div className="writer">{userProfile.userName}</div>
          <ul className="tags">
            {userProfile.tags.map(tag => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <p className="desc">{userProfile.comment}</p>
        </div>
      </div>
    </Container>
  );
}

export default WriterProfile;
