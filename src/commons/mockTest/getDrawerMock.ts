import { IDrawer } from '../interfaces/IDrawer';

export default ({
  drawer = {
    isOpen: false,
    component: null,
    title: '',
  },
  setComponentAtDrawer = jest.fn(),
  handleCloseDrawer = jest.fn(),
  handleOpenDrawer = jest.fn(),
}: {
  drawer?: IDrawer;
  handleOpenDrawer?: jest.Mock;
  handleCloseDrawer?: jest.Mock;
  setComponentAtDrawer?: jest.Mock;
}) => ({
  drawer,
  handleOpenDrawer,
  handleCloseDrawer,
  setComponentAtDrawer,
});
