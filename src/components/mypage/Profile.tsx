import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useInfoQuery } from '../../hooks/api/useInfoQuery';
import { useUserTagsQuery } from '../../hooks/api/useUserTagsQuery';
import { useMyInfoQuery } from '../../hooks/api/useMyInfoQuery';
import ProfileImage from './ProfileImage';
import ProfileInfo from './ProfileInfo';
import ProfileEditForm from './ProfileEditForm';
import { ProfileWrapper } from './styles';

function Profile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const { data: myInfo } = useMyInfoQuery();
  const { data: userData } = useInfoQuery({ id: myInfo.data.id });
  const { data: userTags } = useUserTagsQuery();

  console.log(userData, userTags, userData?.data?.nickname);

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <>
      {!isEditing && (
        <ProfileWrapper>
          <ProfileImage image={userData?.data?.picture} />
          <ProfileInfo
            nickname={userData?.data?.nickname}
            tags={userTags?.data || []}
            content={userData?.data?.content}
          />
          <button onClick={handleEdit} type="button">
            Edit
          </button>
        </ProfileWrapper>
      )}

      {isEditing && (
        <ProfileWrapper>
          <ProfileEditForm
            initialData={{
              id: userData?.data?.id,
              picture: userData?.data?.picture,
              nickname: userData?.data?.nickname,
              content: userData?.data?.content,
            }}
            tags={userTags?.data || []}
            onCancel={() => setIsEditing(false)}
            onNavigateToSettings={() => navigate('/setting')}
          />
        </ProfileWrapper>
      )}
    </>
  );
}
export default Profile;
