import React, { useEffect } from 'react';
import {
  useDownloadOrdersMutation,
  useGetOrdersQuery,
} from '../../redux/Orders.api';
import { IOrder } from '../../interfaces/IOrder.interface';
import { ContractResponse } from '../../../../commons/interfaces/IMockContract';
import { useDispatch } from 'react-redux';
import { OrdersActions } from '../../redux/slice/Orders.slice';
import { Box, Button } from '@mui/material';
import useAlertHandler from '../../../../commons/hooks/useAlertHandler';

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
  const dispatch = useDispatch();

  const {
    currentData,
    isFetching,
    isError: isErrorGetOrder,
    refetch,
  } = useGetOrdersQuery(query);
  const Component = component;
  const [downloadList, downloadListMutation] = useDownloadOrdersMutation();

  useEffect(() => {
    dispatch(OrdersActions.setRefetchOrdersList(refetch));
  }, [dispatch, refetch]);

  useAlertHandler({
    apiResult: downloadListMutation,
    successMessage: 'Download realizado com sucesso!',
    errorMessage: 'Não foi possivel fazer o download!',
    callback: () => {
      if (refetch) {
        refetch();
      }
    },
  });

  return (
    <>
      <Box alignItems="left">
        <Button onClick={() => downloadList(query)} variant="outlined">
          Download Lista
        </Button>
      </Box>
      <Component
        currentData={currentData}
        isFetching={isFetching}
        isErrorGetOrder={isErrorGetOrder}
        refetch={refetch}
      />
    </>
  );
};

export default OrderManager;
