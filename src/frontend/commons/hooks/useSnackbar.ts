import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { SharedActions } from '../redux/slices/SharedSlice';
import { RootState } from '../redux/store';
import { ISnackbar } from '../interfaces/ISnackbar';

interface IUseSnackbar {
  snackbar: ISnackbar;
  showSnackbar({ message, type, open }: ISnackbar): void;
  handleCloseSnackbar(): void;
}

const useSnackBar = (): IUseSnackbar => {
  const dispatch = useDispatch();
  const { snackbar } = useSelector((store: RootState) => store.SharedReducer);

  const showSnackbar = useCallback(
    ({ message, type, open = true }: ISnackbar) => {
      dispatch(SharedActions.setSnackbar({ ...snackbar, message, type, open }));
    },
    [dispatch, snackbar],
  );

  const handleCloseSnackbar = useCallback(() => {
    dispatch(SharedActions.setSnackbar({ ...snackbar, open: false }));
  }, [dispatch, snackbar]);

  return {
    snackbar,
    showSnackbar,
    handleCloseSnackbar,
  };
};

export default useSnackBar;
