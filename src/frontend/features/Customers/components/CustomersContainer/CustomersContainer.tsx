import * as React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  useDeleteCustomerMutation,
  useGetCustomerListQuery,
} from '../../redux/Customers.api';
import ServiceFail from '../../../../commons/components/ServiceFail';
import EditIcon from '@mui/icons-material/Edit';
import InputMask from 'react-input-mask';

import {
  Box,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Grid,
  IconButton,
  TablePagination,
  TextField,
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
import { de } from 'zod/v4/locales';
import { IFiltersCustomers } from '../../interfaces/FiltersCustomers.interface';
import { INITIAL_VALUES_CUSTOMER_FILTERS } from '../../constants/InitialValuesCustomerFilters.constant';
import objetToQueryString from '../../../../../utils/queryString';

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

const CustomerContainer: React.FC = () => {
  const [filters, setFilters] = React.useState<IFiltersCustomers>(
    INITIAL_VALUES_CUSTOMER_FILTERS,
  );
  const query = objetToQueryString(filters);
  const { currentData, isFetching, isError, refetch } =
    useGetCustomerListQuery(query);
  const { setComponentAtDrawer } = useDrawer();
  const { handleOpenModal, handleCloseModal } = useModal();
  const dispatch = useDispatch();
  const [cnpjFilter, setCnpjFilter] = React.useState<string>('');
  const [nameFilter, setNameFilter] = React.useState<string>('');
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

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setFilters((prev) => ({ ...prev, page: newPage + 1 }));
  };
  console.log(filters, nameFilter);
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFilters((prev) => ({
      ...prev,
      limit: parseInt(event.target.value),
      page: 1,
    }));
  };

  useEffect(() => {
    if (cnpjFilter.length === 0 || cnpjFilter.length === 14) {
      setFilters((prev) => ({
        ...prev,
        cnpj: cnpjFilter,
        page: 1,
      }));
    }
  }, [cnpjFilter]);

  useEffect(() => {
    if (!nameFilter.length) {
      setFilters((prev) => ({
        ...prev,
        name: '',
        page: 1,
      }));
    }
  }, [nameFilter]);

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
      <Grid sx={{ marginBottom: 2 }} spacing={2} container>
        <Grid item lg={4} md={4} xs={12}>
          <InputMask
            mask="99.999.999/9999-99"
            value={cnpjFilter}
            style={{ width: '100%' }}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '');
              setCnpjFilter(value);
            }}
          >
            {() => (
              <TextField
                label="CNPJ"
                variant="outlined"
                data-testid="cnpj"
                style={{ width: '100%' }}
                error={!!filters.cnpj && filters.cnpj.length < 14}
                helperText="Informe o CNPJ completo"
              />
            )}
          </InputMask>
        </Grid>
        <Grid item lg={4} md={4} xs={12}>
          <TextField
            label="Nome"
            variant="outlined"
            data-testid="name"
            style={{ width: '100%' }}
            type="search"
            onChange={(e) => setNameFilter(e.target.value)}
            value={nameFilter}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setFilters((prev) => ({
                  ...prev,
                  name: nameFilter,
                  page: 1,
                }));
              }
            }}
          />
        </Grid>
      </Grid>
      {currentData?.output.data?.map((customer) => (
        <Accordion
          key={customer.id}
          expanded={expanded === customer.id}
          onChange={handleChange(customer.id!)}
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
                  value={
                    customer.stateRegistration
                      ? formatIE(customer.stateRegistration)
                      : '-'
                  }
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
      <TablePagination
        component="div"
        count={currentData?.output.pagination.total || 0}
        page={filters.page - 1}
        onPageChange={handleChangePage}
        rowsPerPage={filters.limit}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Linhas por página"
      />
    </Box>
  );
};

export default CustomerContainer;
