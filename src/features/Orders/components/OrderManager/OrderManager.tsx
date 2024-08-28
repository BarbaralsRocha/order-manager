import React from 'react';
import { useGetOrdersQuery } from '../../redux/Orders.api';
import { IOrder } from '../../interfaces/IOrder.interface';
import { ContractResponse } from '../../../../interfaces/IMockContract';

interface OrderManagerChildProps {
  currentData: ContractResponse<IOrder[]> | undefined;
  isFetching: boolean;
  isErrorGetOrder: boolean;
  refetch: () => void;
}

interface IProps {
  query: string;
  component: React.FunctionComponent<OrderManagerChildProps>;
}

const OrderManager: React.FC<IProps> = ({ query, component }) => {
  const {
    currentData,
    isFetching,
    isError: isErrorGetOrder,
    refetch,
  } = useGetOrdersQuery(query);
  const Component = component;

  return (
    <Component
      currentData={currentData}
      isFetching={isFetching}
      isErrorGetOrder={isErrorGetOrder}
      refetch={refetch}
    />
  );
};

export default OrderManager;
