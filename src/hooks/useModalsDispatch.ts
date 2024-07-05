import { useContext } from 'react';
import { ModalsDispatchContext } from '../context/ModalsContext';

function useModalsDispatch() {
  const value = useContext(ModalsDispatchContext);

  if (value === null) {
    throw new Error('useModalsDispatch 오류');
  }

  return value;
}

export default useModalsDispatch;
