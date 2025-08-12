import { useEffect } from 'react';
import useSnackBar from './useSnackbar';

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apiResult: any;
  successMessage: string;
  errorMessage: string;
  callback(): void;
}

const useAlertHandler = ({
  apiResult,
  successMessage,
  errorMessage,
  callback,
}: IProps) => {
  const { showSnackbar } = useSnackBar();
  useEffect(() => {
    if (!apiResult.isUninitialized) {
      if (apiResult.isLoading || apiResult?.isFetching) {
        showSnackbar({ message: 'Salvando dados...', type: 'info' });
        return;
      }
      if (
        apiResult.currentData?.output ||
        apiResult.data?.output ||
        apiResult.isSuccess
      ) {
        callback();
        showSnackbar({ message: successMessage, type: 'success' });
        return;
      } else {
        showSnackbar({
          message: errorMessage,
          type: 'error',
        });
      }
      if (apiResult.isError) {
        showSnackbar({
          message: errorMessage,
          type: 'error',
        });
        return;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    apiResult.currentData?.output,
    apiResult.data?.output,
    apiResult.isError,
    apiResult?.isFetching,
    apiResult.isLoading,
    apiResult.isUninitialized,
    errorMessage,
    successMessage,
  ]);
};

export default useAlertHandler;
