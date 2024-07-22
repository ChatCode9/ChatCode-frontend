import { FormEvent, useRef, useState } from 'react';

import { usePutUserMutation } from '../../hooks/api/usePutUserMutation';
import { TagsType } from '../../types/tags';
import { ProfileImg, InfoWrapper, UserInfoNickname, ButtonWrapper } from './styles';
// import { putImage } from '../../services/image/putImage';
import SettingsIcon from '@mui/icons-material/Settings';
import LocalSeeIcon from '@mui/icons-material/LocalSee';
import { putUserProps } from '../../services/user/putUser';
import usePostFileMutation from '../../hooks/api/usePostFileMutation';

interface ProfileEditFormProps {
  initialData: {
    id: number;
    picture: string;
    nickname: string;
    content: string;
  };
  tags: TagsType[];
  onCancel: () => void;
  onNavigateToSettings: () => void;
}

const ProfileEditForm = ({ initialData, tags, onCancel, onNavigateToSettings }: ProfileEditFormProps) => {
  const [image, setImage] = useState<string | null>(null);
  const contentRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { userMutate } = usePutUserMutation();
  const { postImgMutate, mutationError } = usePostFileMutation();

  const handleImgChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = async () => {
        const base64String = reader.result as string;
        setImage(base64String);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newContent = contentRef.current?.value || initialData.content;
    const isContentChanged = newContent !== initialData.content;
    const isImageChanged = image !== initialData.picture;

    console.log(contentRef.current?.value);

    if (!isContentChanged && !isImageChanged) {
      onCancel();
      return;
    }

    let updatedData: putUserProps = { id: initialData.id };

    if (isContentChanged) {
      updatedData.content = newContent;
    }

    if (isImageChanged && image) {
      try {
        // 파일 전송
        const data = await postImgMutate({ base64File: image, targetId: initialData.id });
        console.log('이미지 업로드 성공');

        // S3로부터의 응답을 기다렸다가 서버에 다시 보내는 부분
        if (data?.data?.url) {
          console.log('data.url', data.data.url);
          updatedData.picture = data.data.url;
        }
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
      }
    }

    userMutate(updatedData);
    onCancel();
  };

  if (mutationError) return <div>Error: {mutationError.message}</div>;

  return (
    <form onSubmit={handleSubmit}>
      <ProfileImg>
        <input
          type="file"
          style={{ display: 'none' }}
          accept="image/*"
          name="profile_img"
          onChange={handleImgChange}
          ref={fileInputRef}
        />
        {image ? (
          <img
            src={image}
            alt="Profile"
            onClick={() => {
              fileInputRef.current?.click();
            }}
          />
        ) : (
          <div
            onClick={() => {
              fileInputRef.current?.click();
            }}
          >
            <LocalSeeIcon style={{ fontSize: '50px' }} />
          </div>
        )}
      </ProfileImg>

      <InfoWrapper>
        <UserInfoNickname>{initialData.nickname}</UserInfoNickname>
        <div>
          {tags.map((tag: TagsType) => (
            <span key={tag.id}>{tag.name}</span>
          ))}
        </div>
        <input style={{ height: '57px' }} type="text" defaultValue={initialData.content} ref={contentRef} />
      </InfoWrapper>
      <ButtonWrapper>
        <button type="submit">Complete</button>
        <button type="button" onClick={onNavigateToSettings}>
          <SettingsIcon />
        </button>
      </ButtonWrapper>
    </form>
  );
};

export default ProfileEditForm;
