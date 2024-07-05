import { Container } from './styles';

interface Props {
  userId: number;
  userName: string;
  avatar: string;
  avatarTags: string[];
  comment: string;
}

function WriterProfile({ userId, userName, avatar, avatarTags, comment }: Props) {
  console.log(userId);
  return (
    <Container>
      <div className="inner">
        <img className="avatar" src={avatar} alt="프로필 이미지" />
        <div className="info">
          <div className="writer">{userName}</div>
          <ul className="tags">
            {avatarTags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <p className="desc">{comment}</p>
        </div>
      </div>
    </Container>
  );
}

export default WriterProfile;
