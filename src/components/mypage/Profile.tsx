import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { SyntheticEvent } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchUserNickname } from '../../services/http';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
// import CameraAltIcon from '@mui/icons-material/CameraAlt';
import LocalSeeIcon from '@mui/icons-material/LocalSee';
import { postFile } from '../../services/http';

interface User {
  data: {
    nickname: string;
    picture: string;
  };
}

//TODO 사진이랑 컨텐트만 수정해서 보낼 수 있도록
function Profile() {
  const navigate = useNavigate();
  const [username, setUserName] = useState<string>('');
  const [userTag, setUserTag] = useState<string[]>([]);
  const [userContent, setUserContent] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [isDefault, setIsDefault] = useState<boolean>(true);
  const fileInput = useRef<HTMLInputElement | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const {
    data,
    isLoading,
    error: queryError,
  } = useQuery<User>({
    queryKey: ['userInfo'],
    queryFn: fetchUserNickname,
  });
  const {
    mutate,
    isPending,
    isError,
    error: mutationError,
  } = useMutation({
    mutationFn: postFile,
    onSuccess: () => {
      console.log('성공!');
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (image) {
      const base64File = image.split(',')[1];
      mutate({ base64File, targetId: 1 });
    }

    console.log({
      image,
    });
  };

  useEffect(() => {
    if (data && data.data.nickname) {
      setUserName(data.data.nickname);
      setImage(data.data.picture);
      // setUserInfo((prevUserInfo) => ({
      //   ...prevUserInfo,
      //   userImg: data.data.picture,
      //   username: data.data.nickname,
      // }));
    }
  }, [data]);
  if (isLoading) return <div>Loading...</div>;
  if (mutationError) return <div>Error: {mutationError.message}</div>;
  const tagName: string[] = [
    'frontend',
    'backend',
    'embeded',
    'ui&ux',
    'design',
    'web',
    'ios',
    'mobile',
    'ai',
    'game',
    'devops',
    'deep learning',
    'data',
    'desktop',
    'algorithm',
    'native',
    'app',
    'protect',
    'study',
    'beginner',
    'job',
    'hire',
    'employment',
    'conference',
    'job fair',
    'competition',
    'hackathon',
  ];

  const handleTagChange = (event: SyntheticEvent, newValue: string[]) => {
    if (newValue.length <= 6) {
      setUserTag([...userTag, ...newValue]);
    } else {
      alert('태그는 최대 6개까지 선택 가능합니다.');
    }
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };
  // 사진이 있으면 업로드 하고 아니면 isDefault가 true 도록
  const handleImgChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = async () => {
        const base64String = reader.result as string;
        setImage(base64String);
        setIsDefault(false);

        // 서버에 파일을 전송하는 코드 추가
        try {
          const base64File = `data:${file.type};base64,${base64String.split(',')[1]}`;
          await postFile({ base64File, targetId: 3 });
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      };

      reader.readAsDataURL(file);
    } else {
      setImage(null);
      setIsDefault(true);
    }
  };

  return (
    <PofileWrapper>
      {/* 편집중일때 */}
      {isEditing ? (
        <>
          <form onSubmit={handleSubmit}>
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
            </ProfileImg>
            <UserInfoWrapper>
              <UserInfoNickname>{username}</UserInfoNickname>
              <UserInfoTag>{userTag}</UserInfoTag>
              <UserInfoInput
                style={{ height: '57px' }}
                type="text"
                value={userContent}
                onChange={(event) => {
                  setUserContent(event.target.value);
                }}
              />
            </UserInfoWrapper>
          </form>
        </>
      ) : (
        <>
          <ProfileImg>{image && <img src={image} alt="Received Image" />}</ProfileImg>
          <InfoWrapper>
            <p>{username}</p>
            <div>
              {userTag.map((item, i) => (
                <span key={i}>{item}</span>
              ))}
            </div>
            <p>{userContent}</p>
          </InfoWrapper>
        </>
      )}

      {isEditing ? (
        <>
          <button type="submit" style={{ margin: '10px' }}>
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
const UserInfoTag = styled.div`
  margin: 10px 0 10px 0;
  outline: none;
`;

const PofileWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 100%;
  height: 300px;

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
const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 100px 0 100px;
  width: 837px;
  height: auto;
  font-weight: 600;
`;
const UserInfoNickname = styled.div`
  height: 32px;
  /* border: 1px solid #d9d9d9; */
  /* border-radius: 4px; */
`;
const UserInfoInput = styled.input`
  height: 32px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
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
    height: 20px;
    padding: 5px;
    border-radius: 6px;
  }
`;
