import styled from 'styled-components';
import Navbar from '../components/NavBar';
import BottomNavBar from '../components/BottomNavBar';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const porfile = params.get('profile');
    if (porfile === '0') {
      navigate('/signup');
    }
  }, [location, navigate]);

  const handleLogin = () => {
    const currentUrl = window.location.href;
    const encodedUrl = encodeURIComponent(currentUrl);
    window.location.href = `https://chatcode.store/login/oauth2/google?url=${encodedUrl}`;
  };

  return (
    <>
      <Navbar></Navbar>
      <LoginBox>
        <SnsLogin>
          <LoginTitle>SNS로 간편하게 시작하기</LoginTitle>
          <SnsBtn>
            <GoogleBox onClick={handleLogin}>
              <div>google</div>
            </GoogleBox>
            <GithubBox>
              <div>github</div>
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
  height: auto;
  min-height: 100%;
  position: relative;
  z-index: 10;
  margin-top: -160px 0 -260px 0;
  justify-content: center;
  padding-bottom: 110px;
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
  div {
    font-size: 20px;
    color: #000000;
    margin: 10px;
  }
`;
const GithubBox = styled.button`
  display: flex;
  align-content: flex-start;
  width: 328px;
  height: 46px;
  background-color: #353e5c;
  border-radius: 6px;
  div {
    color: #ffffff;
    font-size: 20px;
    margin: 10px;
  }
`;
