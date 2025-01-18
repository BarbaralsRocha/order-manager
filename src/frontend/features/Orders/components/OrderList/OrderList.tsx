import React, { useEffect } from 'react';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { timeFormat } from '../../../../../utils/timeFormat';
import { dateFormat } from '../../../../../utils/dateFormat';
import OrderListSkeleton from './OrderListSkeleton';
import { useDeleteOrderMutation } from '../../redux/Orders.api';
import TableRender from '../../../../commons/components/TableRender';
import { IOrder, IProductOrder } from '../../interfaces/IOrder.interface';
import EmptyState from '../../../../commons/components/EmptyState';
import OrderListItems from '../OrderListItems';
import useDrawer from '../../../../commons/hooks/useDrawer';
import FormFormik from '../../../../commons/components/FormFormik';
import validationSchemaOrders from '../OrderRegister/validationSchemaOrders';
import OrderRegister from '../OrderRegister';
import ServiceFail from '../../../../commons/components/ServiceFail';
import useModal from '../../../../commons/hooks/useModal';
import DeleteConfirmation from '../../../../commons/components/DeleteConfirmation';
import useSnackBar from '../../../../commons/hooks/useSnackbar';
import { ContractResponse } from '../../../../commons/interfaces/IMockContract';
import * as S from './OrderList.style';

interface IProps {
  currentData: ContractResponse<IOrder[]> | undefined;
  isFetching: boolean;
  isErrorGetOrder: boolean;
  refetch: () => void;
}

const OrderList: React.FC<IProps> = ({
  currentData,
  isFetching,
  isErrorGetOrder,
  refetch,
}) => {
  const [deleteOrder, { data, isLoading, isError, isUninitialized }] =
    useDeleteOrderMutation();
  const { setComponentAtDrawer } = useDrawer();
  const { handleOpenModal, handleCloseModal } = useModal();
  const { showSnackbar } = useSnackBar();

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

  if (isFetching) {
    return <OrderListSkeleton />;
  }

  if (isErrorGetOrder) {
    return <ServiceFail refetch={refetch} />;
  }

  if (!currentData?.output.length) {
    return (
      <S.Grid>
        <EmptyState
          title="Não há nenhuma encomenda cadastrada"
          description="Clique em 'Adicionar Encomenda' para realizar uma nova encomenda"
        />
      </S.Grid>
    );
  }

  return (
    <>
      {currentData?.output.map((order) => (
        <Accordion key={order.id} defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`customer-${order.id}`}
            id={`customer-${order.id}`}
          >
            <Typography gutterBottom variant="h5" component="div">
              {order.customer?.fantasyName || order.customer?.name}
              <Typography variant="body2" color="text.secondary">
                {order.deliveryDate &&
                  `${dateFormat(new Date(order.deliveryDate))} - ${timeFormat(new Date(order.deliveryDate))}`}
              </Typography>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableRender<IProductOrder>
              columns={[
                { label: 'Produto' },
                { label: 'Medida', position: 'right' },
                { label: 'Quantidade', position: 'right' },
                { label: 'Observações', position: 'right' },
              ]}
              data={order.orderDetails}
              emptyState={
                <EmptyState
                  title="Não há nenhum produto adicionado"
                  description="Preencha os campos acima e clique no '+' para adicionar"
                />
              }
              isLoading={false}
              isError={false}
              renderRow={(rowData: IProductOrder) => (
                <OrderListItems rowData={rowData} />
              )}
            />
          </AccordionDetails>
          <AccordionActions>
            <Button
              size="large"
              startIcon={<EditIcon />}
              onClick={() => {
                console.log({ order });
                setComponentAtDrawer({
                  title: 'Alterar Encomenda',
                  component: (
                    <FormFormik
                      initialValues={order}
                      validationSchema={validationSchemaOrders}
                    >
                      <OrderRegister labelButton="Finalizar" />
                    </FormFormik>
                  ),
                });
              }}
            />
            <Button
              size="large"
              startIcon={<DeleteOutlineIcon />}
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
          </AccordionActions>
        </Accordion>
      ))}
    </>
  );
};

export default OrderList;
