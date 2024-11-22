import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { SharedActions } from '../redux/slices/SharedSlice';
import { RootState } from '../redux/store';
import { IModal } from '../interfaces/IModal';

interface IUseModal {
  modal: IModal;
  handleOpenModal(
    component: React.ReactElement | React.FunctionComponent | undefined,
  ): void;
  handleCloseModal(): void;
}

const useModal = (): IUseModal => {
  const dispatch = useDispatch();
  const { modal } = useSelector((store: RootState) => store.SharedReducer);

  const handleOpenModal = useCallback(
    (component: React.ReactElement | React.FunctionComponent | undefined) => {
      dispatch(SharedActions.setModal({ component, open: true }));
    },
    [dispatch],
  );

  const handleCloseModal = useCallback(() => {
    dispatch(SharedActions.setModal({ component: undefined, open: false }));
  }, [dispatch]);

  return {
    modal,
    handleOpenModal,
    handleCloseModal,
  };
};

export default useModal;
