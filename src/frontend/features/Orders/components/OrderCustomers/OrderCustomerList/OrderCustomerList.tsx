import React, { useEffect } from 'react';
import { IOrder } from '../../../interfaces/IOrder.interface';
import { TableCell } from '@mui/material';
import { dateFormat } from '../../../../../../utils/dateFormat';
import { timeFormat } from '../../../../../../utils/timeFormat';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import useDrawer from '../../../../../commons/hooks/useDrawer';
import FormFormik from '../../../../../commons/components/FormFormik';
import validationSchemaOrders from '../../OrderRegister/validationSchemaOrders';
import OrderRegister from '../../OrderRegister';
import useModal from '../../../../../commons/hooks/useModal';
import DeleteConfirmation from '../../../../../commons/components/DeleteConfirmation';
import { useDeleteOrderMutation } from '../../../redux/Orders.api';
import useSnackBar from '../../../../../commons/hooks/useSnackbar';

interface IProps {
  refetch: () => void;
  order: IOrder;
}

const OrderCustomerList: React.FC<IProps> = ({ order, refetch }) => {
  const { setComponentAtDrawer } = useDrawer();
  const { handleOpenModal, handleCloseModal } = useModal();
  const { showSnackbar } = useSnackBar();
  const [deleteOrder, { data, isLoading, isError, isUninitialized }] =
    useDeleteOrderMutation();

  useEffect(() => {
    if (!isUninitialized) {
      if (isLoading) {
        showSnackbar({ message: 'Salvando dados...', type: 'info' });
        return;
      }
      if (data?.output) {
        handleCloseModal();
        showSnackbar({ message: 'Dados salvos!', type: 'success' });
        refetch();
        return;
      } else {
        showSnackbar({
          message: 'Não foi possivel salvar os dados!',
          type: 'error',
        });
      }
      if (isError) {
        showSnackbar({
          message: 'Não foi possivel salvar os dados!',
          type: 'error',
        });
        return;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.output, isUninitialized, isError, isLoading]);

  return (
    <>
      <TableCell component="th" scope="row" sx={{ p: 0 }}>
        {order.customer?.fantasyName || order.customer?.name}
      </TableCell>
      <TableCell align="right" sx={{ p: 0 }}>
        {order.deliveryDate && dateFormat(new Date(order.deliveryDate))}
      </TableCell>
      <TableCell align="right" sx={{ p: 0 }}>
        {order.deliveryDate && timeFormat(new Date(order.deliveryDate))}
      </TableCell>
      <TableCell align="right">
        <EditIcon
          sx={{ marginRight: 2 }}
          onClick={() =>
            setComponentAtDrawer({
              title: 'Editar Encomenda',
              component: (
                <FormFormik
                  initialValues={order}
                  validationSchema={validationSchemaOrders}
                >
                  <OrderRegister labelButton="Editar" />
                </FormFormik>
              ),
            })
          }
        />
        <DeleteOutlineIcon
          onClick={() =>
            handleOpenModal(
              <DeleteConfirmation
                title={`Tem certeza que deseja excluir o pedido do(a) ${order.customer?.name}`}
                secondaryButton={{
                  label: 'Não excluir',
                  fn: handleCloseModal,
                }}
                primaryButton={{
                  label: 'Excluir pedido',
                  fn: () => order.id && deleteOrder({ orderId: order.id }),
                }}
              />,
            )
          }
        />
      </TableCell>
    </>
  );
};

export default OrderCustomerList;
