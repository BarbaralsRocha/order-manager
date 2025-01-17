import * as React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useGetCustomerListQuery } from '../../redux/Customers.api';
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
import { ConfigButton } from '../../../OrderManager/utils/constants/OrderManagerSection.constant';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../commons/redux/store';
import FormFormik from '../../../../commons/components/FormFormik';
import validationSchemaCustomer from './validationSchemaCustomer';
import CustomersRegister from '../CustomersRegister';

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
  const { currentMenuSelected } = useSelector(
    (store: RootState) => store.ManagerOrdersReducer,
  );
  const [expanded, setExpanded] = React.useState<number | false>(false);

  const handleChange =
    (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  if (isFetching) {
    <div> loading</div>;
  }

  if (isError) {
    <ServiceFail refetch={refetch} />;
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
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Typography component="span">{customer.fantasyName}</Typography>
            <IconButton
              aria-label="edit"
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
