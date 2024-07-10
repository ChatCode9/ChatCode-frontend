import { Container } from './styles';

interface Props {
  id: number;
  nickname: string;
  avatar: string;
  activityPoint: number;
  content: string;
}

function WriterProfile({ id, nickname, avatar, activityPoint, content }: Props) {
  console.log(id);
  return (
    <Container>
      <div className="inner">
        <img className="avatar" src={avatar} alt="프로필 이미지" />
        <div className="info">
          <div className="writer">{nickname}</div>
          <ul className="tags">{activityPoint}</ul>
          <p className="desc">{content}</p>
        </div>
      </div>
    </Container>
  );
}

export default WriterProfile;
