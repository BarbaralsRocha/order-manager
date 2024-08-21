import React from 'react';
import TableRender from '../../../../components/TableRender';
import EmptyState from '../../../../components/EmptyState';
import { ContractResponse } from '../../../../interfaces/IMockContract';
import { IOrder } from '../../interfaces/IOrder.interface';
import OrderCustomerList from './OrderCustomerList';

interface IProps {
  currentData: ContractResponse<IOrder[]> | undefined;
  isFetching: boolean;
  isErrorGetOrder: boolean;
  refetch: () => void;
}

const OrderCustomers: React.FC<IProps> = ({
  currentData,
  isFetching,
  isErrorGetOrder,
  refetch,
}) => {
  return (
    <TableRender<IOrder>
      columns={[
        { label: 'Cliente' },
        { label: 'Data', position: 'right' },
        { label: 'Horário', position: 'right' },
        { label: '', position: 'right' },
      ]}
      data={currentData?.output || []}
      emptyState={
        <EmptyState
          title="Não há nenhum produto adicionado"
          description="Preencha os campos acima e clique no '+' para adicionar"
        />
      }
      isLoading={isFetching}
      isError={isErrorGetOrder}
      renderRow={(rowData: IOrder) => (
        <OrderCustomerList refetch={refetch} order={rowData} />
      )}
    />
  );
};

export default OrderCustomers;
