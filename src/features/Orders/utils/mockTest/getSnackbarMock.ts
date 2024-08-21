import { ISnackbar } from '../../../../interfaces/ISnackbar';

export default ({
  snackbar = {
    message: '',
    type: 'success',
    open: false,
  },
  showSnackbar = jest.fn(),
  handleCloseSnackbar = jest.fn(),
}: {
  snackbar?: ISnackbar;
  showSnackbar?: jest.Mock;
  handleCloseSnackbar?: jest.Mock;
}) => ({
  snackbar,
  showSnackbar,
  handleCloseSnackbar,
});
