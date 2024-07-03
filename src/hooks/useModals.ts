import { useContext } from 'react';
import { ModalsStateContext } from '../context/ModalsContext';

function useModalsValue() {
  const value = useContext(ModalsStateContext);

  if (value === undefined) {
    throw new Error('useModalsValue 오류');
  }

  return value;
}

export default useModalsValue;
