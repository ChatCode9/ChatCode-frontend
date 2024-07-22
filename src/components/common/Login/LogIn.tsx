import { useLayoutEffect, type PropsWithChildren } from 'react';
import { useSetRecoilState } from 'recoil';

import { isLoggedInState } from '../../../atoms/authState';
import { useMyInfoQuery } from '../../../hooks/api/useMyInfoQuery';

interface LogInProps extends PropsWithChildren {}

const LogIn = ({ children }: LogInProps) => {
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  const { data: myInfo } = useMyInfoQuery();
  console.log(myInfo);

  useLayoutEffect(() => {
    if (myInfo?.data) {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);

  return <>{children}</>;
};

export default LogIn;
