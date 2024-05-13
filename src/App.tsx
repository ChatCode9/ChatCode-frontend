import { Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useQuery } from '@tanstack/react-query';

import { textState } from './atoms/textState';
import { getTodos } from './services/getTodos';
import useModalsDispatch from './hooks/useModalsDispatch';
import { SolveModal } from './components/SolveModal';

function App() {
  const { data, isLoading, isError } = useQuery({ queryKey: ['todos'], queryFn: getTodos });
  const value = useRecoilValue(textState);
  const Dispatch = useModalsDispatch();

  const handleOpenModal = () => {
    console.log(Dispatch.showModal);
    Dispatch?.showModal({
      title: '해결 완료로 전환 하시겠습니까?',
      message: '해결 완료로 전환 시 대기로 재 전환은 불가합니다.',
    });
  };
  console.log(value);

  console.log(data, isLoading, isError);

  return (
    <div>
      <header>헤더</header>
      <Outlet />
      <SolveModal />
      <button onClick={handleOpenModal}>Open Modal</button>
    </div>
  );
}

export default App;
