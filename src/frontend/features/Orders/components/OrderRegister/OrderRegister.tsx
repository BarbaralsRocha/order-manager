import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Box,
  Divider,
  Typography,
  Button,
  Autocomplete,
} from '@mui/material';
import { useFormikContext } from 'formik';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import * as S from './OrderRegister.style';
import useDrawer from '../../../../commons/hooks/useDrawer';
import { IOrder, IProductOrder } from '../../interfaces/IOrder.interface';
import {
  useEditOrderMutation,
  useGetCustomerListQuery,
  useSendOrderMutation,
} from '../../redux/Orders.api';
import { INITIAL_VALUES_PRODUCT_ORDER } from '../../utils/constants/Order.constant';
import useRegister from '../../hooks/useRegister';
import SkeletonComponent from '../../../../commons/components/SkeletonComponent';
import EmptyState from '../../../../commons/components/EmptyState';
import TableRender from '../../../../commons/components/TableRender';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import OrderListItems from '../OrderListItems';
import { Measurement } from '../../../../commons/types/Measurement.type';
import useAlertHandler from '../../../../commons/hooks/useAlertHandler';
import { useGetProductsQuery } from '../../../Products/redux/Products.api';
import { MeasurementEnum } from '../../../../commons/enums/Measurement.enum';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../commons/redux/store';

dayjs.locale('pt-br');

interface IProps {
  labelButton?: 'Cadastrar' | 'Finalizar';
}

const OrderRegister: React.FC<IProps> = ({ labelButton = 'Cadastrar' }) => {
  const {
    currentData: currentDataCustomer,
    isFetching: isLoadingCustomer,
    isError: isErrorCustomer,
    refetch: refetchCustomer,
  } = useGetCustomerListQuery();
  const {
    currentData: currentDataProducts,
    isFetching: isLoadingProducts,
    isError: isErrorProducts,
    refetch: refetchProducts,
  } = useGetProductsQuery();
  const [sendOrder, sendOrderMutation] = useSendOrderMutation();
  const [editOrder, editOrderMutation] = useEditOrderMutation();
  const { values, setFieldValue, setFieldTouched, errors } =
    useFormikContext<IOrder>();
  const { handleCloseDrawer } = useDrawer();
  const { insertRegister, handleRemoveRegister } = useRegister();
  const [listCustomers, setListCustomers] = useState<
    { id?: number; label: string }[] | undefined
  >([]);
  const [listProducts, setListProducts] = useState<
    { id: number; label: string }[] | undefined
  >([]);
  const [renderKeyQty, setRenderKeyQty] = useState(0);
  const [renderKey, setRenderKey] = useState(200);
  const [products, setProducts] = useState<IProductOrder>(
    INITIAL_VALUES_PRODUCT_ORDER,
  );
  const { refecth } = useSelector((store: RootState) => store.OrdersReducer);
  const IS_EDITING = labelButton === 'Finalizar';

  useAlertHandler({
    apiResult: sendOrderMutation,
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
    apiResult: editOrderMutation,
    successMessage: 'Dados salvos!',
    errorMessage: 'Não foi possivel salvar os dados!',
    callback: () => {
      handleCloseDrawer();
      if (refecth) {
        refecth();
      }
    },
  });

  useEffect(() => {
    const formartList = currentDataCustomer?.output.data?.reduce(
      (acc, value) => {
        const format = {
          id: value.id,
          label: value.fantasyName || value.name,
        };
        acc.push(format);
        return acc;
      },
      [] as { id?: number; label: string }[],
    );
    setListCustomers(formartList);
  }, [currentDataCustomer]);

  useEffect(() => {
    const formartList = currentDataProducts?.output.reduce(
      (acc, value) => {
        const format = {
          id: value.id as number,
          label: value.name as string,
        };
        acc.push(format);
        return acc;
      },
      [] as { id: number; label: string }[],
    );
    setListProducts(formartList);
  }, [currentDataProducts]);

  const handleInsertProduct = () => {
    insertRegister<IProductOrder>(
      'orderDetails',
      products,
      values.orderDetails,
    );
    setProducts(INITIAL_VALUES_PRODUCT_ORDER);
    setRenderKey((prevKey) => prevKey + 1);
    setRenderKeyQty((prevKey) => prevKey + 1);
  };

  const disableButtonToAddProduct = useMemo(() => {
    const { productId, type, weight, quantity } = products;
    const qtde = Boolean(weight) || Boolean(quantity);
    return Object.values({ productId, qtde, type }).some((s) => !s);
  }, [products]);

  const isOrderComplete = useMemo(() => {
    const requiredFields = [values.customerId, values.deliveryDate];

    return (
      requiredFields.every((field) => field !== null && field !== undefined) &&
      values.orderDetails.length > 0
    );
  }, [values]);

  const finishOrder = useCallback(() => {
    return IS_EDITING ? editOrder(values) : sendOrder(values);
  }, [IS_EDITING, editOrder, sendOrder, values]);

  const IS_TYPE = useCallback(
    (type: Measurement) => {
      return products.product?.type?.includes(type);
    },
    [products.product?.type],
  );

  const findCustomer = useMemo(() => {
    return listCustomers?.find((customer) => customer.id === values.customerId);
  }, [listCustomers, values.customerId]);

  const findProduct = useMemo(() => {
    return listProducts?.find((product) => product.id === products.productId);
  }, [listProducts, products.productId]);

  const setProductOnChange = useCallback(
    (id: number | null) => {
      const productSelected = currentDataProducts?.output?.find(
        (p) => p.id === id,
      );
      if (productSelected) {
        setProducts((prev) => ({
          ...prev,
          product: productSelected,
          productId: Number(id),
        }));
      }
    },
    [currentDataProducts],
  );

  return (
    <S.Container>
      <div style={{ paddingTop: 32, overflow: 'scrollbars' }}>
        <Box
          sx={{
            display: 'flex',
            p: 4,
            paddingTop: 0,
            gap: 2,
          }}
        >
          <SkeletonComponent
            width={300}
            height={56}
            loading={isLoadingCustomer}
          >
            <FormControl>
              <Autocomplete
                disablePortal
                options={listCustomers || []}
                sx={{ width: 300, paddingTop: 0 }}
                value={findCustomer || null}
                onChange={(_, newValue) => {
                  setFieldValue('customerId', newValue ? newValue.id : null);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Selecionar cliente"
                    value={values.customerId}
                  />
                )}
              />
              {isErrorCustomer && (
                <Box display="flex" gap={1} marginTop={1}>
                  <Typography variant="caption" color="error">
                    Erro ao carregar a lista de clientes
                  </Typography>
                  <AutorenewIcon onClick={refetchCustomer} />
                </Box>
              )}
            </FormControl>
          </SkeletonComponent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              ampm={false}
              label="Data da entrega"
              views={['year', 'month', 'day', 'hours']}
              format="DD/MM/YYYY      HH:mm"
              value={
                values.deliveryDate ? dayjs(values.deliveryDate) : undefined
              }
              onChange={(e) => {
                setFieldValue('deliveryDate', e && e.toISOString());
                setTimeout(() => setFieldTouched('deliveryDate', true));
              }}
            />
          </LocalizationProvider>
        </Box>
        <Divider />
        <Typography sx={{ p: 4 }} variant="h6">
          Adicionar produto
        </Typography>

        <Box
          sx={{
            display: 'flex',
            paddingLeft: 4,
            paddingRight: 4,
            alignItems: 'center',
            gap: 2,
          }}
        >
          <SkeletonComponent
            width={300}
            height={56}
            loading={isLoadingProducts}
          >
            <FormControl>
              <Autocomplete
                disablePortal
                options={listProducts || []}
                sx={{ width: 300, paddingTop: 0 }}
                value={findProduct || null}
                onChange={(_, newValue) => {
                  setProductOnChange(newValue ? newValue.id : null);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Selecionar o produto"
                    value={products.productId}
                  />
                )}
              />
              {isErrorProducts && (
                <Box display="flex" gap={1} marginTop={1}>
                  <Typography variant="caption" color="error">
                    Erro ao carregar a lista de produtos
                  </Typography>
                  <AutorenewIcon onClick={refetchProducts} />
                </Box>
              )}
            </FormControl>
          </SkeletonComponent>
          <TextField
            label="Qtde"
            variant="outlined"
            type="number"
            key={renderKeyQty}
            data-testid="quantity"
            sx={{ width: 100 }}
            value={
              products.quantity?.toString() ||
              products.weight?.toString() ||
              null
            }
            onChange={(e) => {
              setProducts((prev) => ({
                ...prev,
                ...(prev.type === MeasurementEnum.UN
                  ? { quantity: Number(e.target.value), weight: null }
                  : {
                      weight: Number(e.target.value),
                      quantity: null,
                    }),
              }));
            }}
          />

          <FormControl fullWidth sx={{ width: 100 }}>
            <InputLabel>Medida</InputLabel>
            <Select
              value={products.type || ''}
              label="Medida"
              data-testid="type"
              disabled={!products.productId}
              onChange={(e) =>
                setProducts((prev) => ({
                  ...prev,
                  type: e.target.value as Measurement,
                }))
              }
            >
              {IS_TYPE('UN') && <MenuItem value="UN">UN</MenuItem>}
              {IS_TYPE('KG') && <MenuItem value="KG">KG</MenuItem>}
            </Select>
          </FormControl>

          <TextField
            label="Comentário"
            variant="outlined"
            key={renderKey}
            data-testid="additionalInformations"
            value={products.additionalInformation || undefined}
            onChange={(e) =>
              setProducts((prev) => ({
                ...prev,
                additionalInformation: e.target.value,
              }))
            }
            sx={{ width: 200 }}
          />
          <AddCircleOutlineIcon
            fontSize="large"
            data-testid="add-product"
            sx={{
              color: disableButtonToAddProduct
                ? 'neutral.light.main'
                : 'neutral.dark.contrastText',
              cursor: disableButtonToAddProduct ? 'not-allowed' : 'pointer',
            }}
            onClick={() => {
              if (disableButtonToAddProduct) return;
              handleInsertProduct();
            }}
          />
        </Box>

        <Typography sx={{ p: 4 }} variant="h6">
          Produto adicionado
        </Typography>
        <Box sx={{ paddingLeft: 4, paddingRight: 4 }}>
          <TableRender<IProductOrder>
            columns={[
              { label: 'Produto' },
              { label: 'Medida', position: 'right' },
              { label: 'Quantidade', position: 'right' },
              { label: 'Observações', position: 'right' },
              { label: '', position: 'right' },
            ]}
            data={values.orderDetails}
            emptyState={
              <EmptyState
                title="Não há nenhum produto adicionado"
                description="Preencha os campos acima e clique no '+' para adicionar"
              />
            }
            isLoading={false}
            isError={false}
            renderRow={(rowData: IProductOrder) => (
              <OrderListItems
                editProduct={() => setProducts(rowData)}
                deleteProduct={() => {
                  setProducts(INITIAL_VALUES_PRODUCT_ORDER);
                  handleRemoveRegister(
                    'orderDetails',
                    rowData,
                    values.orderDetails,
                  );
                }}
                rowData={rowData}
              />
            )}
          />
        </Box>
      </div>

      <div>
        <Divider />
        <Box sx={{ p: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
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
            disabled={!isOrderComplete || sendOrderMutation.isLoading}
            onClick={() => finishOrder()}
          >
            {labelButton}
          </Button>
        </Box>
      </div>
    </S.Container>
  );
};

export default OrderRegister;
