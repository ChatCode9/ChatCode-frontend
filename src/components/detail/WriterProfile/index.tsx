import { Container } from './styles';

interface Props {
  writer: string;
}

function WriterProfile({ writer }: Props) {
  return (
    <Container>
      <div className="inner">
        <img className="avatar" src="https://placehold.co/60" alt="프로필 이미지" />
        <div className="info">
          <div className="writer">{writer}</div>

          <ul className="tags">
            <li>frontend</li>
            <li>backend</li>
            <li>ui/ux engineer</li>
            <li>beginner</li>
          </ul>

          <p className="desc">This is test user profile</p>
        </div>
      </div>
    </Container>
  );
}

export default WriterProfile;
