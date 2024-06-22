import { useGetProfileQuery } from '../../redux/ManageOrders.api';

const OrderManager: React.FC = () => {
  const { currentData, isLoading, error } = useGetProfileQuery();
  console.log({ currentData, isLoading, error });
  return <div>TESTE</div>;
};

export default OrderManager;
