import { useLayoutEffect, type PropsWithChildren } from 'react';
import { useSetRecoilState } from 'recoil';

import { isLoggedInState } from '../../../atoms/authState';
import { getMyInfo } from '../../../services/user/getMyInfo';

interface LogInProps extends PropsWithChildren {}

const LogIn = ({ children }: LogInProps) => {
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  const myInfo = getMyInfo();
  console.log(myInfo);

  useLayoutEffect(() => {
    if (localStorage.getItem('Authorization')) {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);

  return <>{children}</>;
};

export default LogIn;
