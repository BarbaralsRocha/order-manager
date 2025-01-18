/* eslint-disable import/no-extraneous-dependencies */
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Box,
  Divider,
  Button,
} from '@mui/material';
import { useFormikContext } from 'formik';
import React, { useCallback, useEffect, useMemo } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import * as S from './ProductRegister.style';
import { IProduct } from '../../utils/interfaces/IProduct';
import { Measurement } from '../../../../commons/types/Measurement.type';
import useDrawer from '../../../../commons/hooks/useDrawer';
import { IDecimal } from '../../../../commons/interfaces/Decimal.interface';
import { MeasurementEnum } from '../../../../commons/enums/Measurement.enum';
import CurrencyInput from '../../../../commons/components/CurrencyInput';
import DecimalInput from '../../../../commons/components/DecimalInput';
import {
  useAddProductMutation,
  useEditProductMutation,
} from '../../redux/Products.api';
import useAlertHandler from '../../../../commons/hooks/useAlertHandler';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../commons/redux/store';
dayjs.locale('pt-br');

interface IProps {
  labelButton?: 'Cadastrar' | 'Editar';
}

const ProductRegister: React.FC<IProps> = ({ labelButton = 'Cadastrar' }) => {
  const { values, setFieldValue, setFieldTouched, errors } =
    useFormikContext<IProduct>();
  const [addProduct, addProductMutation] = useAddProductMutation();
  const [editProduct, editProductMutation] = useEditProductMutation();
  const { handleCloseDrawer } = useDrawer();
  const { refetchList } = useSelector(
    (state: RootState) => state.ProductsReducer,
  );

  const IS_EDITING = labelButton === 'Editar';

  const SHOW_UNITY_PRICE = useMemo(
    () =>
      values.type === MeasurementEnum.UN ||
      values.type === MeasurementEnum.UN_KG,
    [values.type],
  );

  const SHOW_WEIGHT_PRICE = useMemo(
    () =>
      values.type === MeasurementEnum.KG ||
      values.type === MeasurementEnum.UN_KG,
    [values.type],
  );

  useEffect(() => {
    setFieldTouched('', true);
  }, [setFieldTouched]);

  useAlertHandler({
    apiResult: addProductMutation,
    successMessage: 'Dados salvos!',
    errorMessage: 'Não foi possivel salvar os dados!',
    callback: () => {
      handleCloseDrawer();
      if (refetchList) {
        refetchList();
      }
    },
  });

  useAlertHandler({
    apiResult: editProductMutation,
    successMessage: 'Dados salvos!',
    errorMessage: 'Não foi possivel salvar os dados!',
    callback: () => {
      handleCloseDrawer();
      if (refetchList) {
        refetchList();
      }
    },
  });

  const handleChange = (
    field: keyof IProduct,
    value: IProduct[keyof IProduct],
  ) => {
    setFieldValue(field, value);
    setTimeout(() => setFieldTouched(field, true));
  };

  const cleanFields = (fields: (keyof IProduct)[]) => {
    fields.forEach((field) => handleChange(field, ''));
  };

  const disableButton = useMemo(() => {
    return Object.keys(errors).length > 0 || addProductMutation.isLoading;
  }, [addProductMutation.isLoading, errors]);

  const saveProduct = useCallback(() => {
    return IS_EDITING ? editProduct({ body: values }) : addProduct(values);
  }, [IS_EDITING, addProduct, editProduct, values]);

  return (
    <S.Container>
      <div style={{ paddingTop: 32 }}>
        <Box
          flexDirection="column"
          display="flex"
          sx={{
            p: 4,
            paddingTop: 0,
            gap: 2,
          }}
        >
          <TextField
            label="Nome do produto"
            variant="outlined"
            data-testid="name"
            value={values.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel>Medida</InputLabel>
            <Select
              value={values.type || ''}
              label="Medida"
              data-testid="type"
              onChange={(e) => {
                handleChange('type', e.target.value as Measurement);
                cleanFields(['unityPrice', 'unitaryWeight', 'weightPrice']);
              }}
            >
              <MenuItem value={MeasurementEnum.UN}>
                {MeasurementEnum.UN}
              </MenuItem>
              <MenuItem value={MeasurementEnum.KG}>
                {MeasurementEnum.KG}
              </MenuItem>
              <MenuItem value={MeasurementEnum.UN_KG}>
                {MeasurementEnum.UN_KG}
              </MenuItem>
            </Select>
          </FormControl>
          {SHOW_WEIGHT_PRICE && (
            <CurrencyInput
              label="Preço por Quilo"
              value={values.weightPrice}
              onChange={(e: IDecimal) =>
                handleChange('weightPrice', e.floatValue)
              }
            />
          )}
          {SHOW_UNITY_PRICE && (
            <CurrencyInput
              label="Preço unitário"
              value={values.unityPrice}
              onChange={(e: IDecimal) =>
                handleChange('unityPrice', e.floatValue)
              }
            />
          )}
          {SHOW_UNITY_PRICE && (
            <DecimalInput
              value={values.unitaryWeight || undefined}
              onChange={(e) => handleChange('unitaryWeight', Number(e.value))}
              label="Peso unitário"
            />
          )}
          <TextField
            label="Informações adicionais"
            variant="outlined"
            data-testid="additionalInformation"
            value={values.additionalInformation || ''}
            onChange={(e) =>
              handleChange('additionalInformation', e.target.value)
            }
          />
        </Box>
      </div>
      <div>
        <Divider />
        <Box display="flex" justifyContent="flex-end" sx={{ p: 4, gap: 2 }}>
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
            data-testid="register-product"
            disabled={disableButton}
            onClick={() => saveProduct()}
          >
            {labelButton}
          </Button>
        </Box>
      </div>
    </S.Container>
  );
};

export default ProductRegister;
