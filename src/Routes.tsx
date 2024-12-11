import { HashRouter, Route, Routes } from 'react-router-dom';
import OrderManagerContainer from './frontend/features/OrderManager/OrderManagerContainer';
import DrawerContainer from './frontend/commons/components/DrawerContainer';
import SnackbarContainer from './frontend/commons/components/SnackbarContainer';
import ModalContainer from './frontend/commons/components/ModalContainer';

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
