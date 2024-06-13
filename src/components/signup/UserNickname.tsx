import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchUserNickname } from '../../services/http';

interface User {
  data: {
    nickname: string;
  };
}

function Nickname() {
  const [nickname, setNickname] = useState<string>('');
  const handlechange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const { data, isLoading, error }: UseQueryResult<User, Error> = useQuery({
    queryKey: ['userInfo'],
    queryFn: fetchUserNickname,
  });
  useEffect(() => {
    if (data && data.data.nickname) {
      setNickname(data.data.nickname);
    }
  }, [data]);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <SignupInfoBox>회원가입에 필요한 기본정보를 입력해주세요.</SignupInfoBox>
      <NicknameInfo>
        <label htmlFor="nickname_id"></label>
        <div>
          <NicknameInput
            type="text"
            id="nickname_id"
            value={nickname}
            onChange={handlechange}
            placeholder="별명을 알파벳, 한글, 숫자를 이용해 8자 이하로 입력해주세요"
          />
        </div>
      </NicknameInfo>
    </>
  );
}
export default Nickname;
const SignupInfoBox = styled.div`
  display: flex;
  width: 448px;
  height: 20px;
  align-items: center;
  color: #5d5a88;
  font-size: 12px;
  margin: 60px 0 50px 0;

  &::before,
  &::after {
    content: '';
    flex-grow: 1;
    background: #5d5a88;
    height: 1px;
    font-size: 12px;
    line-height: 0px;
    margin: 0px 16px;
  }
`;
const NicknameInfo = styled.div`
  color: #6d758f;
  font-size: 14px;
  font-weight: Bold;
`;
const NicknameInput = styled.input`
  width: 524px;
  height: 46px;
  background-color: #ffffff;
  font-size: 14px;
  font-weight: bold;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #f1f3f7;
  outline: none;
  margin-top: 20px;
  &::placeholder {
    color: #6d758f;
  }
`;
