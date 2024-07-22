import { TagsType } from '../../types/tags';
import { InfoWrapper, UserInfoNickname } from './styles';

interface Props {
  nickname: string;
  tags: TagsType[];
  content: string;
}

const ProfileInfo = ({ nickname, tags, content }: Props) => {
  return (
    <InfoWrapper>
      <UserInfoNickname>{nickname}</UserInfoNickname>
      <div>
        {tags.map((tag: TagsType) => (
          <span key={tag.id}>{tag.name}</span>
        ))}
      </div>
      <p>{content}</p>
    </InfoWrapper>
  );
};

export default ProfileInfo;
