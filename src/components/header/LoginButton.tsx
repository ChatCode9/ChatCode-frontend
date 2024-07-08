import styled from 'styled-components';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

const LoginButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goLogin = useCallback(() => {
    if (location.pathname !== '/login') {
      navigate('/login');
    }
  }, [navigate, location]);

  return (
    <LoginBtn onClick={goLogin}>
      <LockOpenIcon fontSize="small" color="inherit" />
      Login
    </LoginBtn>
  );
};

export default LoginButton;

const LoginBtn = styled.button`
  width: 138px;
  height: 46px;
  border: 1px solid black;
  border-radius: 50px;
  margin-left: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #5d5a88;
  color: #ffffff;
  font-size: 18px;
  gap: 4px;
  &:hover {
    background-color: #6d758f;
    color: #ffffff;
    border: 1px solid #6d758f;
  }
`;
