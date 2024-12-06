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
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
} from '@mui/material';
import { useFormikContext } from 'formik';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import { PeriodType } from '../../utils/types/Period.type';
import { PeriodEnum } from '../../utils/enums/Period.enum';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { IPeriod } from '../../utils/interfaces/IPeriod';
import objetToQueryString from '../../../../utils/queryString';
dayjs.locale('pt-br');

interface IProps {
  labelButton?: 'Cadastrar' | 'Editar';
}

const ProductRegister: React.FC<IProps> = ({ labelButton = 'Cadastrar' }) => {
  const { values, setFieldValue, setFieldTouched, errors } =
    useFormikContext<IProduct>();
  const [addProduct, addProductMutation] = useAddProductMutation();
  const [editProduct, editProductMutation] = useEditProductMutation();
  const [period, setPeriod] = useState<PeriodType>();
  const [date, setDate] = useState<IPeriod>({
    startDate: dayjs(new Date()),
    endDate: dayjs(new Date()),
  });
  const { handleCloseDrawer } = useDrawer();

  const IS_EDITING = labelButton === 'Editar';

  const IS_RANGE_PERIOD = useMemo(() => period === PeriodEnum.RANGE, [period]);

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
    callback: () => handleCloseDrawer(),
  });

  useAlertHandler({
    apiResult: editProductMutation,
    successMessage: 'Dados salvos!',
    errorMessage: 'Não foi possivel salvar os dados!',
    callback: () => handleCloseDrawer(),
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

  useEffect(() => {
    if (period === PeriodEnum.ALL) {
      setDate({
        startDate: null,
        endDate: dayjs(new Date()),
      });
    }
  }, [period]);

  const validatePeriodDate = useMemo(() => {
    if (period === PeriodEnum.RANGE) {
      return date.startDate != null && date.endDate != null;
    }
    return true;
  }, [period, date]);

  const disableButton = useMemo(() => {
    return (
      Object.keys(errors).length > 0 ||
      addProductMutation.isLoading ||
      !period ||
      !validatePeriodDate
    );
  }, [addProductMutation.isLoading, errors, period, validatePeriodDate]);

  const saveProduct = useCallback(() => {
    const formatedDate = {
      startDate: date.startDate?.format('YYYY-MM-DD'),
      endDate: date.endDate?.format('YYYY-MM-DD'),
    };
    const queryDate = objetToQueryString(formatedDate);
    return IS_EDITING
      ? editProduct({ body: values, date: queryDate })
      : addProduct(values);
  }, [
    IS_EDITING,
    addProduct,
    date.endDate,
    date.startDate,
    editProduct,
    values,
  ]);

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
          {SHOW_UNITY_PRICE && (
            <CurrencyInput
              label="Preço unitário"
              value={values.unityPrice}
              onChange={(e: IDecimal) =>
                handleChange('unityPrice', e.floatValue)
              }
            />
          )}
          {SHOW_WEIGHT_PRICE && (
            <>
              <DecimalInput
                value={values.unitaryWeight || undefined}
                onChange={(e) => handleChange('unitaryWeight', Number(e.value))}
                label="Peso unitário"
              />

              <CurrencyInput
                label="Preço por peso"
                value={values.weightPrice}
                onChange={(e: IDecimal) =>
                  handleChange('weightPrice', e.floatValue)
                }
              />
            </>
          )}

          <TextField
            label="Informações adicionais"
            variant="outlined"
            data-testid="additionalInformations"
            value={values.additionalInformations || ''}
            onChange={(e) =>
              handleChange('additionalInformations', e.target.value)
            }
          />

          {IS_EDITING && (
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                Período
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                defaultValue=""
                name="controlled-radio-buttons-group"
                value={period}
                onChange={(event) =>
                  setPeriod(
                    (event.target as HTMLInputElement).value as PeriodType,
                  )
                }
              >
                <FormControlLabel
                  value={PeriodEnum.ALL}
                  control={<Radio />}
                  label="Mudar para todos registros antigos"
                />
                <FormControlLabel
                  value={PeriodEnum.RANGE}
                  control={<Radio />}
                  label="Mudar somente em um período específico"
                />
              </RadioGroup>
            </FormControl>
          )}
          {IS_RANGE_PERIOD && IS_EDITING && (
            <>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    label="Data início"
                    views={['year', 'month', 'day']}
                    format="DD/MM/YYYY"
                    value={date.startDate ? dayjs(date.startDate) : undefined}
                    onChange={(e) => {
                      setDate((prev) => ({
                        ...prev,
                        startDate: dayjs(e),
                      }));
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    label="Data fim"
                    views={['year', 'month', 'day']}
                    format="DD/MM/YYYY"
                    value={date.endDate ? dayjs(date.endDate) : undefined}
                    onChange={(e) =>
                      setDate((prev) => ({
                        ...prev,
                        endDate: dayjs(e),
                      }))
                    }
                  />
                </DemoContainer>
              </LocalizationProvider>
            </>
          )}
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
