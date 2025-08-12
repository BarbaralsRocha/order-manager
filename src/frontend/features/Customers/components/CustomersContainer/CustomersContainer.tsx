import * as React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  useDeleteCustomerMutation,
  useGetCustomerListQuery,
} from '../../redux/Customers.api';
import ServiceFail from '../../../../commons/components/ServiceFail';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Grid,
  IconButton,
} from '@mui/material';
import {
  formatCNPJ,
  formatIE,
  formatPhoneNumber,
} from '../../../../commons/utils/formatMask';
import useDrawer from '../../../../commons/hooks/useDrawer';
import { useDispatch } from 'react-redux';
import FormFormik from '../../../../commons/components/FormFormik';
import validationSchemaCustomer from './validationSchemaCustomer';
import CustomersRegister from '../CustomersRegister';
import { CustomersActions } from '../../redux/slice/Customers.slice';
import { useEffect } from 'react';
import OrderListSkeleton from '../../../Orders/components/OrderList/OrderListSkeleton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import useModal from '../../../../commons/hooks/useModal';
import DeleteConfirmation from '../../../../commons/components/DeleteConfirmation';
import useAlertHandler from '../../../../commons/hooks/useAlertHandler';

interface IPropsRenderInfoColumn {
  label: string;
  value?: string;
}

const RenderInfoColumn: React.FC<IPropsRenderInfoColumn> = ({
  label,
  value,
}) => {
  return (
    <Box flexDirection="column" gap="6px" display="flex">
      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
        {label}
      </Typography>
      <Typography>{value || '-'}</Typography>
    </Box>
  );
};

export default function ControlledAccordions() {
  const { currentData, isFetching, isError, refetch } =
    useGetCustomerListQuery();
  const { setComponentAtDrawer } = useDrawer();
  const { handleOpenModal, handleCloseModal } = useModal();
  const dispatch = useDispatch();
  const [expanded, setExpanded] = React.useState<number | false>(false);
  const [deleteCustomer, deleteCustomerMutation] = useDeleteCustomerMutation();

  const handleChange =
    (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  useEffect(() => {
    dispatch(CustomersActions.setRefetchCustomersList(refetch));
  }, [dispatch, refetch]);

  useAlertHandler({
    apiResult: deleteCustomerMutation,
    successMessage: 'Dados salvos!',
    errorMessage: 'Não foi possivel salvar os dados!',
    callback: () => {
      handleCloseModal();
      if (refetch) {
        refetch();
      }
    },
  });

  if (isFetching) {
    return <OrderListSkeleton />;
  }

  if (isError) {
    return <ServiceFail refetch={refetch} />;
  }

  return (
    <Box sx={{ p: 3, gap: 3 }}>
      <Typography sx={{ p: 2, paddingLeft: 0, paddingTop: 0 }} variant="h6">
        Dados dos clientes
      </Typography>
      {currentData?.output.map((customer) => (
        <Accordion
          key={customer.id}
          expanded={expanded === customer.id}
          onChange={handleChange(customer.id)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            sx={{}}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              width="100%"
              alignItems="center"
            >
              <Typography component="span">{customer.fantasyName}</Typography>
              <div>
                <IconButton
                  aria-label="edit"
                  color="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenModal(
                      <DeleteConfirmation
                        title={`Tem certeza que deseja excluir o cliente ${customer.name}`}
                        secondaryButton={{
                          label: 'Não excluir',
                          fn: handleCloseModal,
                        }}
                        primaryButton={{
                          label: 'Excluir pedido',
                          fn: () =>
                            customer.id &&
                            deleteCustomer({ customerId: customer.id }),
                        }}
                      />,
                    );
                  }}
                  sx={{ marginLeft: 'auto' }}
                >
                  <DeleteOutlineIcon />
                </IconButton>
                <IconButton
                  aria-label="edit"
                  color="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    setComponentAtDrawer({
                      title: 'Cadastro de cliente',
                      component: (
                        <FormFormik
                          initialValues={customer}
                          validationSchema={validationSchemaCustomer}
                        >
                          <CustomersRegister labelButton="Editar" />
                        </FormFormik>
                      ),
                    });
                  }}
                  sx={{ marginLeft: 'auto' }}
                >
                  <EditIcon />
                </IconButton>
              </div>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item component="div" lg={12} xl={12} md={12}>
                <RenderInfoColumn label="Razão social" value={customer.name} />
              </Grid>
              <Grid item component="div" lg={12} xl={12} md={12}>
                <RenderInfoColumn label="Endereço" value={customer.address} />
              </Grid>
              <Grid item component="div" lg={4} xl={4} md={4}>
                <RenderInfoColumn
                  label="CNPJ"
                  value={formatCNPJ(customer.cnpj)}
                />
              </Grid>
              <Grid item component="div" lg={4} xl={4} md={4}>
                <RenderInfoColumn
                  label="Inscrição estadual"
                  value={formatIE(customer.stateRegistration)}
                />
              </Grid>
              <Grid item component="div" lg={4} xl={4} md={4}>
                <RenderInfoColumn
                  label="Telefone"
                  value={formatPhoneNumber(customer.phoneNumber)}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
