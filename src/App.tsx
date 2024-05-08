import { Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useQuery } from '@tanstack/react-query';

import { textState } from './atoms/textState';
import { getTodos } from './services/getTodos';

function App() {
  // const { data, isLoading, isError } = useQuery({ queryKey: ['todos'], queryFn: getTodos });
  const value = useRecoilValue(textState);

  // console.log(value);

  // console.log(data, isLoading, isError);

  return (
    <div>
      <header>헤더</header>
      <Outlet />
    </div>
  );
}

export default App;
