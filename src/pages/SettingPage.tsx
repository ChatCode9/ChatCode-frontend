import styled from 'styled-components';

import Navbar from '../components/header/NavBar';
import Nickname from '../components/signup/UserNickname';
import UserTag from '../components/signup/UserTag';
import LoginManagement from '../components/setting/LoginManagement';
import Footer from '../components/BottomNavBar';

function SettingPage() {
  return (
    <>
      <Container>
        <Navbar />
        <LoginBox>
          <SnsLogin>
            <Nickname />
            <UserTag />
            <LoginManagement />
          </SnsLogin>
        </LoginBox>
      </Container>
      <Footer />
    </>
  );
}

export default SettingPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  min-height: 100%;
`;
const LoginBox = styled.div`
  display: flex;
  min-height: 100%;
  position: relative;
  z-index: 10;
  margin-top: 10px;
  justify-content: center;
`;

const SnsLogin = styled.div`
  display: flex;
  height: 100%;
  max-width: 40rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
