import {
  Route,
  Navigate,
  Routes,
  BrowserRouter as Router,
} from 'react-router-dom';
import OrderManagerContainer from './frontend/features/OrderManager/OrderManagerContainer';
import DrawerContainer from './frontend/commons/components/DrawerContainer';
import SnackbarContainer from './frontend/commons/components/SnackbarContainer';
import ModalContainer from './frontend/commons/components/ModalContainer';
import LoginPage from './frontend/features/Auth/LoginPage';
import { AuthGuard } from './frontend/features/Auth/AuthGuard';
// import RegisterPage from './frontend/features/Auth/RegisterPage';
// import ForgotPasswordPage from './frontend/features/Auth/ForgotPasswordPage';
const RoutesOrderManager: React.FC = () => {
  return (
    <>
      <ModalContainer />
      <SnackbarContainer />
      <DrawerContainer />
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/callback" element={<div>Processando login...</div>} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/register" element={<RegisterPage />} /> */}
          {/* <Route path="/forgot-password" element={<ForgotPasswordPage />} /> */}

          {/* Protected routes */}
          <Route
            path="/"
            element={
              <AuthGuard>
                <OrderManagerContainer />
              </AuthGuard>
            }
          />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </>
  );
};

export default RoutesOrderManager;
