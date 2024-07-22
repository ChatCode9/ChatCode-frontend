export type ErrorFallbackProps = {
  error: Error;
  resetErrorBoundary: () => void;
};

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  return (
    <>
      {error.message} 에러가 발생했습니다!
      <button onClick={resetErrorBoundary}>재시도</button>
    </>
  );
};

export default ErrorFallback;
