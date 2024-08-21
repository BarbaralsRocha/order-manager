import { IModal } from '../../../../interfaces/IModal';

export default ({
  modal = {
    open: false,
    component: undefined,
  },
  handleOpenModal = jest.fn(),
  handleCloseModal = jest.fn(),
}: {
  modal?: IModal;
  handleOpenModal?: jest.Mock;
  handleCloseModal?: jest.Mock;
}) => ({
  modal,
  handleOpenModal,
  handleCloseModal,
});
