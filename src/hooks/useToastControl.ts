import { useSetRecoilState } from 'recoil';
import { isToastVisibleState, toastMessageState } from '../atoms/toastState';
import { useCallback } from 'react';

export function useToastControl() {
  const setToastMessage = useSetRecoilState(toastMessageState);
  const setToastVisible = useSetRecoilState(isToastVisibleState);

  const showToast = useCallback(
    (message: string) => {
      setToastMessage(message);
      setToastVisible(true);
    },
    [setToastMessage, setToastVisible],
  );

  const hideToast = useCallback(() => {
    setToastVisible(false);
  }, [setToastVisible]);

  return { showToast, hideToast };
}
