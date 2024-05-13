import styled from 'styled-components';
import Navbar from '../components/NavBar';
import BottomNavBar from '../components/BottomNavBar';
import { useState } from 'react';

function LoginPage() {
  const userLoginState = useState(true);
  return (
    <>
      <Navbar></Navbar>
      <LoginBox>
        <SnsLogin>
          <LoginTitle>SNS로 간편하게 시작하기</LoginTitle>
          <SnsBtn>
            <GoogleBox>
              <Link href="">google</Link>
            </GoogleBox>

            <GithubBox>
              <Link href="">github</Link>
            </GithubBox>
          </SnsBtn>
        </SnsLogin>
      </LoginBox>

      <BottomNavBar></BottomNavBar>
    </>
  );
}
export default LoginPage;

const LoginBox = styled.div`
  display: flex;

  min-height: 100%;
  position: relative;
  z-index: 10;
  margin-top: -110px 0 -260px 0;
  justify-content: center;
`;
const LoginTitle = styled.div`
  width: 328px;
  height: 30px;
  color: #6d758f;
  font-weight: bold;
`;
const SnsLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 150px;
`;
const SnsBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  height: 70%;
`;
const GoogleBox = styled.button`
  display: flex;
  align-content: flex-start;
  border: 1px solid #f1f3f7;
  width: 328px;
  height: 46px;
  background-color: #ffffff;
  margin-bottom: 20px;
  border-radius: 6px;
`;
const GithubBox = styled.button`
  display: flex;
  align-content: flex-start;
  width: 328px;
  height: 46px;
  background-color: #353e5c;
  border-radius: 6px;
  a {
    color: #ffffff;
  }
`;

const Link = styled.a`
  font-size: 20px;
  color: #000000;
  text-decoration: none;
  outline: none;
  margin: 10px;
`;
