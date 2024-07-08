import styled from 'styled-components';

import Navbar from '../components/header/NavBar';
import Nickname from '../components/signup/UserNickname';
import UserTag from '../components/signup/UserTag';
import UserConsent from '../components/signup/UserConsent';

function SignupPage() {
  return (
    <Container>
      <Navbar />
      <LoginBox>
        <SnsLogin>
          <Nickname />
          <UserTag />
          <UserConsent />
        </SnsLogin>
      </LoginBox>
    </Container>
  );
}

export default SignupPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
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
