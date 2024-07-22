import { useAvatarQuery } from '../../../hooks/api/useAvatarQuery';
import { AvatarName } from '../../../types/avatar';
import { Container } from './styles';

function WriterProfile({ name }: AvatarName) {
  const { avatarData } = useAvatarQuery({ name });
  console.log(name);

  if (!avatarData?.data) return null;

  const { nickname, activityPoint, picture, content } = avatarData?.data;

  return (
    <Container>
      <div className="inner">
        <img className="avatar" src={picture} alt="프로필 이미지" />
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
