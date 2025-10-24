/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  TextField,
} from '@mui/material';
import { ICustomer } from '../../interfaces/ICustomer';
import { useFormikContext } from 'formik';
import InputMask from 'react-input-mask';
import useDrawer from '../../../../commons/hooks/useDrawer';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  useAddCustomerMutation,
  useEditCustomerMutation,
} from '../../redux/Customers.api';
import useAlertHandler from '../../../../commons/hooks/useAlertHandler';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../commons/redux/store';
import * as S from './CustomersRegister.style';

interface IProps {
  labelButton?: 'Cadastrar' | 'Editar';
}

const CustomersRegister: React.FC<IProps> = ({ labelButton = 'Cadastrar' }) => {
  const { values, setFieldValue, setFieldTouched, errors, touched } =
    useFormikContext<ICustomer>();
  const { handleCloseDrawer } = useDrawer();
  const [cnpj, setCnpj] = useState<string | undefined>(values.cnpj || '');
  const [stateRegistration, setStateRegistration] = useState<
    string | undefined
  >(values.stateRegistration || '');
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(
    values.phoneNumber || '',
  );
  const [addCustomer, addCustomerMutation] = useAddCustomerMutation();
  const [editCustomer, editCustomerMutation] = useEditCustomerMutation();
  const IS_EDITING = labelButton === 'Editar';
  const { refecth } = useSelector((store: RootState) => store.CustomersReducer);

  useEffect(() => {
    setFieldTouched('', true);
  }, [setFieldTouched]);

  useAlertHandler({
    apiResult: addCustomerMutation,
    successMessage: 'Dados salvos!',
    errorMessage: 'Não foi possivel salvar os dados!',
    callback: () => {
      handleCloseDrawer();
      if (refecth) {
        refecth();
      }
    },
  });

  useAlertHandler({
    apiResult: editCustomerMutation,
    successMessage: 'Dados salvos!',
    errorMessage: 'Não foi possivel salvar os dados!',
    callback: () => {
      handleCloseDrawer();
      if (refecth) {
        refecth();
      }
    },
  });

  const handleChange = (
    field: keyof ICustomer,
    value: ICustomer[keyof ICustomer],
  ) => {
    setFieldValue(field, value);
    setTimeout(() => setFieldTouched(field, true));
  };

  const disableButton = useMemo(() => {
    return Object.keys(errors).length > 0;
  }, [errors]);

  const handleMaskedChange = (
    field: keyof ICustomer,
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string | undefined>>,
  ) => {
    const unmaskedValue = value.replace(/\D/g, '');
    setValue(value);
    handleChange(field, unmaskedValue);
  };

  const saveProduct = useCallback(() => {
    return IS_EDITING ? editCustomer({ body: values }) : addCustomer(values);
  }, [IS_EDITING, addCustomer, editCustomer, values]);

  const validationResult = useMemo(() => {
    if (addCustomerMutation.isError) {
      return (addCustomerMutation?.error as { data: any })?.data
        ?.validationResult as { [key: string]: string }[];
    }
    return null;
  }, [addCustomerMutation.isError, addCustomerMutation?.error]);

  return (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Grid container width={600} spacing={2} sx={{ p: 4 }}>
        <Grid item component="div" lg={12} xl={12} md={12}>
          {addCustomerMutation.isError && (
            <Alert variant="outlined" severity="error">
              Campos com erros não poderão ser salvos.
              <List
                sx={{
                  width: '100%',
                  bgcolor: 'background.paper',
                  overflow: 'auto',
                  listStyleType: 'disc',
                  pl: 3,
                }}
                component="ul"
              >
                {validationResult?.map((value) => (
                  <ListItem
                    component="li"
                    sx={{ p: 0, display: 'list-item' }}
                    key={`item-${Object.keys(value)}`}
                  >
                    <S.ItemTexto
                      sx={{
                        '& .MuiListItemText-primary': {
                          fontSize: '12px',
                        },
                      }}
                      primary={Object.values(value)}
                    />
                  </ListItem>
                ))}
              </List>
            </Alert>
          )}
        </Grid>
        <Grid item component="div" lg={12} xl={12} md={12}>
          <TextField
            label="Nome fantasia"
            variant="outlined"
            data-testid="fantasyName"
            style={{ width: '100%' }}
            value={values.fantasyName || undefined}
            onChange={(e) => handleChange('fantasyName', e.target.value)}
            color={
              errors.fantasyName && touched.fantasyName ? 'error' : 'primary'
            }
            error={Boolean(errors.fantasyName && touched.fantasyName)}
            helperText={
              errors.fantasyName && touched.fantasyName
                ? errors.fantasyName
                : ''
            }
          />
        </Grid>
        <Grid item component="div" lg={12} xl={12} md={12}>
          <TextField
            label="Razão social"
            variant="outlined"
            data-testid="name"
            style={{ width: '100%' }}
            value={values.name || undefined}
            onChange={(e) => handleChange('name', e.target.value)}
            error={Boolean(errors.name && touched.name)}
            helperText={errors.name && touched.name ? errors.name : ''}
          />
        </Grid>
        <Grid item component="div" lg={12} xl={12} md={12}>
          <TextField
            label="Endereço"
            variant="outlined"
            data-testid="address"
            style={{ width: '100%' }}
            value={values.address || undefined}
            onChange={(e) => handleChange('address', e.target.value)}
            error={Boolean(errors.address && touched.address)}
            helperText={errors.address && touched.address ? errors.address : ''}
          />
        </Grid>
        <Grid item component="div" lg={6} xl={6} md={6}>
          <InputMask
            mask="99.999.999/9999-99"
            value={cnpj}
            onChange={(e) =>
              handleMaskedChange('cnpj', e.target.value, setCnpj)
            }
          >
            {() => (
              <TextField
                label="CNPJ"
                variant="outlined"
                data-testid="cnpj"
                style={{ width: '100%' }}
                error={Boolean(errors.cnpj && touched.cnpj)}
                helperText={errors.cnpj && touched.cnpj ? errors.cnpj : ''}
              />
            )}
          </InputMask>
        </Grid>
        <Grid item component="div" lg={6} xl={6} md={6}>
          <InputMask
            mask="(99)999999999"
            value={phoneNumber}
            onChange={(e) =>
              handleMaskedChange('phoneNumber', e.target.value, setPhoneNumber)
            }
          >
            {() => (
              <TextField
                label="Telefone"
                variant="outlined"
                data-testid="phoneNumber"
                style={{ width: '100%' }}
                error={Boolean(errors.phoneNumber && touched.phoneNumber)}
                helperText={
                  errors.phoneNumber && touched.phoneNumber
                    ? errors.phoneNumber
                    : ''
                }
              />
            )}
          </InputMask>
        </Grid>
        <Grid item component="div" lg={12} xl={12} md={12}>
          <InputMask
            mask="999.999.999.999"
            value={stateRegistration || ''}
            disabled={values.isStateRegistrationExempt}
            onChange={(e) => {
              const value = e.target.value;
              handleMaskedChange(
                'stateRegistration',
                value,
                setStateRegistration,
              );
            }}
          >
            {() => (
              <TextField
                label="Inscrição Estadual"
                variant="outlined"
                data-testid="stateRegistration"
                style={{ width: '100%' }}
                disabled={values.isStateRegistrationExempt}
                error={Boolean(
                  errors.stateRegistration && touched.stateRegistration,
                )}
                helperText={
                  errors.stateRegistration && touched.stateRegistration
                    ? errors.stateRegistration
                    : ''
                }
              />
            )}
          </InputMask>
        </Grid>
        <Grid item component="div" lg={12} xl={12} md={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={values.isStateRegistrationExempt}
                onChange={(e) => {
                  handleChange('isStateRegistrationExempt', e.target.checked);
                  if (e.target.checked) {
                    setStateRegistration(undefined);
                    handleChange('stateRegistration', null);
                  }
                }}
                disabled={!!stateRegistration?.replace(/[^0-9]/g, '')}
              />
            }
            label="Inscrição Estadual Isenta"
          />
        </Grid>
      </Grid>
      <div>
        <Divider />
        <Box justifyContent="flex-end" display="flex" p={4} gap={2}>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            data-testid="back-button"
            onClick={handleCloseDrawer}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            size="large"
            data-testid="register-order"
            disabled={disableButton}
            onClick={() => saveProduct()}
          >
            {labelButton}
          </Button>
        </Box>
      </div>
    </Box>
  );
};

export default CustomersRegister;
