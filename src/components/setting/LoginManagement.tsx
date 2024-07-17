import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { tagState } from '../../atoms/userInfoState';
import { usePostTags } from '../../hooks/api/usePostTags';
import styled from 'styled-components';
import googleLogo from '../../../public/googleLogo.svg';
import githubLogo from '../../../public/githubLogo.png';
import Checkbox from '@mui/material/Checkbox';
import { clickedListState } from '../../atoms/userInfoState';

interface LoginBtnProps {
  bgColor: string;
  color: string;
}

function LoginManagement() {
  const navigate = useNavigate();
  const selectedTags: number[] = useRecoilValue(tagState);
  const clickedList = useRecoilValue(clickedListState);
  console.log('selectedTags', selectedTags);
  console.log('clickedList', clickedList);
  const { mutate: postUserTags } = usePostTags();
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const handleSubmitTags = () => {
    const formattedTags = selectedTags.map((tagId) => {
      return { id: tagId };
    });
    postUserTags(formattedTags);
    navigate('/mypage');
  };

  return (
    <>
      <LoginInfoBox>로그인 관리</LoginInfoBox>
      <LoginBtn bgColor="#FFFFFF" color="black">
        <img src={googleLogo} />
        Continue with Google
      </LoginBtn>
      <LoginBtn bgColor="#353E5C" color="#FFFFFF">
        <img src={githubLogo} />
        Continue with Github
      </LoginBtn>
      <SaveBtn onClick={handleSubmitTags}>수정 완료</SaveBtn>
      <DeleteUserInfo>
        <div className="deleteTitle">회원탈퇴</div>
        <textarea name="deleteContent"></textarea>
        <div className="consentBox">
          <p>회원 탈퇴에 관한 정책을 읽고 이에 동의합니다. </p>
          <Checkbox {...label} />
        </div>

        <div className="deleteBtn">
          <button>탈퇴하기</button>
        </div>
      </DeleteUserInfo>
    </>
  );
}
export default LoginManagement;
const DeleteUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  margin: 30px;
  .deleteTitle {
    display: flex;
    justify-content: center;
    color: #6d758f;
    font-size: 14px;
    font-weight: 900;
    margin-bottom: 25px;
  }
  textarea {
    width: 537px;
    height: 128px;
    border-radius: 5px;
    border: 1px solid #8d8ba7;
    outline: none;
    padding: 10px;
    font-size: 14px;
    line-height: 1.5;
    resize: none;
  }
  .consentBox {
    display: flex;
    align-items: center;
    justify-content: space-around;
    p {
      display: flex;
      justify-content: center;
      color: #6d758f;
      font-size: 12px;
      font-weight: 600;
      margin-top: 10px;
    }
  }

  .deleteBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    button {
      margin-top: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 121px;
      height: 35px;
      background: none;
      background-color: #e28282;
      border-radius: 5px;
      border: none;
      color: white;
    }
  }
`;

const LoginInfoBox = styled.div`
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

const LoginBtn = styled.div<LoginBtnProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 240px;
  height: 52px;
  border: 1px solid #989898;
  border-radius: 5px;
  margin: 10px;
  font: 14px;
  font-weight: 600;
  padding: 5px;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  img {
    margin-right: 10px;
  }
`;

const SaveBtn = styled.div`
  width: 520px;
  height: 38px;
  background-color: #5d5a88;
  border-radius: 5px;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  margin: 40px 0 30px 0;
`;
