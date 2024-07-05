import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@tanstack/react-query';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import LocalSeeIcon from '@mui/icons-material/LocalSee';

import { postFile } from '../../services/image/postFile';
import { useRecoilState } from 'recoil';
import { nickNameState } from '../../atoms/userInfoState';
import { ContentState } from '../../atoms/userInfoState';
import { usePutUserContent } from '../../hooks/api/usePutUserContent';
import { useInfoQuery } from '../../hooks/api/useInfoQuery';
import { useUserTagsQuery } from '../../hooks/api/useUserTagsQuery';
import { putImage } from '../../services/image/putImage';

function Profile() {
  const navigate = useNavigate();
  const [username, setUserName] = useRecoilState<string>(nickNameState);
  const [userTag, setUserTag] = useState<{ id: number; name: string }[]>([]);
  const [userContent, setUserContent] = useRecoilState<string>(ContentState);
  const [isEditing, setIsEditing] = useState(false);
  const [isContentChanged, setIsContentChanged] = useState<boolean>(false);

  //사진관련 상태
  const [image, setImage] = useState<string | null>(null);
  const [isImageChanged, setIsImageChanged] = useState<boolean>(false);
  const [isDefault, setIsDefault] = useState<boolean>(true);
  const fileInput = useRef<HTMLInputElement | null>(null);

  const { data: userData } = useInfoQuery();
  const { mutateAsync: contentMutate } = usePutUserContent();
  const { data: userTags } = useUserTagsQuery();
  const { mutateAsync: postImg, error: mutationError } = useMutation({
    mutationFn: postFile,
    onSuccess: () => {
      console.log('이미지 s3에 보내기 성공!');
    },
    onError: (error) => {
      console.error('Mutation error:', error);
    },
  });

  useEffect(() => {
    if (userData && userData.data.content && userData.data.nickname && userTags) {
      setUserName(userData.data.nickname);
      setImage(userData.data.picture);
      setUserContent(userData.data.content);
      setUserTag(userTags.data);
    }
  }, [userData, setUserName, setUserContent, userTags]);

  const handleSave = async () => {
    if (!isImageChanged && !isContentChanged) {
      setIsEditing(false);
      console.log('No changes to save');
      return;
    }

    const contentToSend = { content: userContent };
    if (isContentChanged) {
      try {
        await contentMutate(contentToSend);
        setIsEditing(false);
      } catch (error) {
        console.log('내용 저장 안됨', error);
      }
    }

    if (image && isImageChanged) {
      const base64File = image;
      if (!base64File) {
        console.error('Invalid image data format');
        return;
      }
      try {
        // 파일 전송
        const data = await postImg({ base64File: base64File, targetId: 9 });
        console.log('이미지 업로드 성공');

        // S3로부터의 응답을 기다렸다가 서버에 다시 보내는 부분
        if (data && data.data && data.data.url) {
          console.log('data.url', data.data.url);

          try {
            await putImage({ picture: data.data.url });
            console.log('S3 이미지 서버에 전송 성공');
          } catch (error) {
            console.error('S3 이미지 서버에 전송 실패:', error);
          }
        }

        setIsEditing(false);
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
      }
    }

    setIsImageChanged(false);
    setIsContentChanged(false);
  };

  if (mutationError) return <div>Error: {mutationError.message}</div>;

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleImgChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = async () => {
        const base64String = reader.result as string;
        setImage(base64String);
        setIsDefault(false);
        setIsImageChanged(true);
      };

      reader.readAsDataURL(file);
    } else {
      setImage(null);
      setIsDefault(true);
    }
  };

  return (
    <PofileWrapper>
      {isEditing ? (
        <>
          <form>
            <ProfileImg>
              <input
                type="file"
                style={{ display: 'none' }}
                accept="image/*"
                name="profile_img"
                onChange={handleImgChange}
                ref={fileInput}
              />
              {isDefault ? (
                <div
                  onClick={() => {
                    if (fileInput.current) {
                      fileInput.current.click();
                    }
                  }}
                >
                  <LocalSeeIcon style={{ fontSize: '50px' }} />
                </div>
              ) : (
                <img
                  src={image as string}
                  alt="Profile"
                  onClick={() => {
                    if (fileInput.current) {
                      fileInput.current.click();
                    }
                  }}
                />
              )}
              {/* 편집중일때 */}
            </ProfileImg>
            <InfoWrapper>
              <UserInfoNickname>{username}</UserInfoNickname>

              <div>
                {userTag.map((tag) => (
                  <span key={tag.id}>{tag.name}</span>
                ))}
              </div>
              <input
                style={{ height: '57px' }}
                type="text"
                value={userContent}
                onChange={(event) => {
                  setUserContent(event.target.value);
                  setIsContentChanged(true);
                }}
              />
            </InfoWrapper>
          </form>
        </>
      ) : (
        <>
          <ProfileImg>{image && <img src={image} alt="Received Image" />}</ProfileImg>
          <InfoWrapper>
            <UserInfoNickname>{username}</UserInfoNickname>
            <div>
              {userTag.map((tag) => (
                <span key={tag.id}>{tag.name}</span>
              ))}
            </div>
            <p>{userContent}</p>
          </InfoWrapper>
        </>
      )}

      {isEditing ? (
        <>
          <button type="submit" style={{ margin: '10px' }} onClick={handleSave}>
            Complete
          </button>
          <button onClick={() => navigate('/setting')} type="button">
            <SettingsIcon />
          </button>
        </>
      ) : (
        <button onClick={handleEdit} type="button">
          Edit
        </button>
      )}
    </PofileWrapper>
  );
}
export default Profile;

const PofileWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 100%;
  height: 300px;
  form {
    display: flex;
  }
  button {
    width: 83px;
    height: 37px;
    border-radius: 10px;
    background-color: #8d8ba7;
    border: none;
    color: #ffffff;
    font-size: 12px;
    &:hover {
      background-color: #6d758f;
      color: #ffffff;
      border: none;
    }
  }
`;
const ProfileImg = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  overflow: hidden;
  img {
    width: 100%;
  }
  div {
    width: 100%;
    height: 100%;
    background-color: #6c6b76;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
  }
`;

const UserInfoNickname = styled.div`
  height: 32px;
  margin-bottom: 10px;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 100px 0 100px;
  width: 837px;
  height: 150px;
  font-weight: 600;
  input {
    height: 32px;

    border: none;
    outline: none;
    margin-bottom: 10px;
  }
  div {
    display: flex;
    width: 100%;
  }
  span {
    margin-right: 10px;
    background-color: #d9d9d9;
    width: auto;
    height: auto;
    padding: 5px;
    border-radius: 6px;
  }
  p {
    margin-top: 10px;
  }
  input {
    height: 32px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    margin-top: 10px;
  }
`;
