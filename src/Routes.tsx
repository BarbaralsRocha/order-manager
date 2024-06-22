import { HashRouter, Route, Routes } from 'react-router-dom';
import OrderManager from './pages/OrderManager';

const RoutesOrderManager: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<OrderManager />} />
      </Routes>
    </HashRouter>
  );
};

export default RoutesOrderManager;
