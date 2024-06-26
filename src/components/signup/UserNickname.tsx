import styled from 'styled-components';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { nickNameState } from '../../atoms/userInfoState';
import { useGetInfo } from '../../hooks/mypageHooks';

function Nickname() {
  const [nickName, setNickName] = useRecoilState<string>(nickNameState);

  const { data: userData } = useGetInfo();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(event.target.value);
  };

  useEffect(() => {
    if (userData && userData.data && userData.data.nickname) {
      console.log('닉네임data', userData);
      setNickName(userData.data.nickname);
    }
  }, [userData, setNickName]);

  return (
    <>
      <SignupInfoBox>회원가입에 필요한 기본정보를 입력해주세요.</SignupInfoBox>
      <NicknameInfo>
        <label htmlFor="nickname_id"></label>
        <div>
          <NicknameInput
            type="text"
            id="nickname_id"
            value={nickName}
            onChange={handleChange}
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
