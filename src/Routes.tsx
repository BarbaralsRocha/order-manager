import { HashRouter, Route, Routes } from 'react-router-dom';
import OrderManagerContainer from './features/OrderManager/OrderManagerContainer';
import DrawerContainer from './components/DrawerContainer';
import SnackbarContainer from './components/SnackbarContainer';
import ModalContainer from './components/ModalContainer';

const RoutesOrderManager: React.FC = () => {
  return (
    <>
      <ModalContainer />
      <SnackbarContainer />
      <DrawerContainer />
      <HashRouter>
        <Routes>
          <Route path="/" element={<OrderManagerContainer />} />
        </Routes>
      </HashRouter>
    </>
  );
};

export default RoutesOrderManager;
