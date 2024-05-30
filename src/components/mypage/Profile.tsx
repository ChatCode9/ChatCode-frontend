import { useState } from 'react';
import styled from 'styled-components';
import { TextField, Chip, Autocomplete } from '@mui/material';

import { SyntheticEvent } from 'react';
interface UserInfo {
  username: string;
  userTag: string[];
  userContent: string;
}
function Profile() {
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
  const [userInfo, setUserInfo] = useState<UserInfo>({
    username: '유니',
    userTag: ['프엔'],
    userContent: '안녕하세요~',
  });
  const handleTagChange = (event: SyntheticEvent, newValue: string[]) => {
    if (newValue.length <= 6) {
      setUserInfo({ ...userInfo, userTag: newValue });
    } else {
      alert('태그는 최대 6개까지 선택 가능합니다.');
    }
  };
  const [isEditing, setIsEditing] = useState(false);
  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <PofileWrapper>
      <ProfileImg>
        <img></img>
      </ProfileImg>

      {isEditing ? (
        <UserInfoWrapper>
          <UserInfoInput
            type="text"
            value={userInfo.username}
            onChange={(event) => {
              setUserInfo({ ...userInfo, username: event.target.value });
            }}
          />
          <UserInfoTag>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={tagName}
              value={userInfo.userTag}
              onChange={handleTagChange}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={<span style={{ display: 'flex', alignItems: 'center' }}>{option}</span>}
                    {...getTagProps({ index })}
                    onDelete={() => {
                      setUserInfo({
                        ...userInfo,
                        userTag: userInfo.userTag.filter((t) => t !== option),
                      });
                    }}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField {...params} variant="outlined" label="태그를 선택하세요" placeholder="태그를 선택하세요" />
              )}
            />
          </UserInfoTag>
          <UserInfoInput
            style={{ height: '57px' }}
            type="text"
            value={userInfo.userContent}
            onChange={(event) => {
              setUserInfo({ ...userInfo, userContent: event.target.value });
            }}
          />
        </UserInfoWrapper>
      ) : (
        <InfoWrapper>
          <p>{userInfo.username}</p>
          <div>
            {userInfo.userTag.map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </div>

          <p>{userInfo.userContent}</p>
        </InfoWrapper>
      )}

      {isEditing ? (
        <>
          <button onClick={handleEdit} style={{ margin: '10px' }}>
            수정
          </button>
          <button onClick={handleEdit}>취소</button>
        </>
      ) : (
        <button onClick={handleEdit}>Edit</button>
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
  border: 1px solid #8d8ba7;
  border-radius: 50px;
  background-color: #8d8ba7;
`;
const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 100px 0 100px;
  width: 837px;
  height: auto;
  font-weight: 600;
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
