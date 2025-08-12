import React, { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import SkeletonComponent from '../../../../commons/components/SkeletonComponent';
import { useGetProductsQuery } from '../../../Products/redux/Products.api';
import { IFilters } from '../../interfaces/IOrder.interface';
import { INITIAL_VALUES_FILTERS } from '../../utils/constants/Order.constant';
import { IOptionSelect } from '../../../../commons/interfaces/ICommon.interface';
import { useGetCustomerListQuery } from '../../redux/Orders.api';

interface IProps {
  filters: IFilters;
  setFilters: React.Dispatch<React.SetStateAction<IFilters>>;
  hasFilter: {
    customer: boolean;
    date: boolean;
    time: boolean;
    products: boolean;
  };
}

const Filters: React.FC<IProps> = ({ filters, setFilters, hasFilter }) => {
  const {
    currentData: currentDataProducts,
    isFetching: isLoadingProducts,
    isError: isErrorProducts,
    refetch: refetchProducts,
  } = useGetProductsQuery();
  const {
    currentData: currentDataCustomers,
    isFetching: isLoadingCustomers,
    isError: isErrorCustomers,
    refetch: refetchCustomers,
  } = useGetCustomerListQuery();

  const [listProducts, setListProducts] = useState<IOptionSelect[] | undefined>(
    [],
  );

  const [listCustomers, setListCustomers] = useState<
    { id: number; label: string }[] | undefined
  >([]);

  useEffect(() => {
    const formartListProducts = currentDataProducts?.output.reduce(
      (acc, value) => {
        const format = {
          id: value.id as number,
          value: value.name as string,
        };
        acc.push(format);
        return acc;
      },
      [] as IOptionSelect[],
    );

    const formartListCustomers = currentDataCustomers?.output.reduce(
      (acc, value) => {
        const format = {
          id: value.id as number,
          label: value.fantasyName as string,
        };
        acc.push(format);
        return acc;
      },
      [] as { id: number; label: string }[],
    );
    setListProducts(formartListProducts);
    setListCustomers(formartListCustomers);
  }, [currentDataProducts, currentDataCustomers]);

  const handleChangeProducts = (
    event: SelectChangeEvent<typeof filters.products>,
  ) => {
    const {
      target: { value },
    } = event;
    setFilters((prev) => {
      if (typeof value === 'string') {
        return { ...prev, products: value.split(',') };
      }
      return { ...prev, products: value };
    });
  };

  const handleChange = useCallback(
    (field: keyof IFilters, value: IFilters[keyof IFilters]) => {
      setFilters((prev) => ({ ...prev, [field]: value }));
    },
    [setFilters],
  );

  return (
    <Box gap={1}>
      <Box>
        <Typography sx={{ p: 0, paddingLeft: 0 }} variant="h6">
          Filtros
        </Typography>
      </Box>
      <Box
        display="flex"
        gap={2}
        sx={{ paddingLeft: 0 }}
        alignItems="flex-start"
      >
        <Box
          display="flex"
          gap={2}
          sx={{ paddingLeft: 0 }}
          alignItems="flex-start"
        >
          {hasFilter.customer && (
            <SkeletonComponent
              width={300}
              height={56}
              sx={{ m: 1 }}
              loading={isLoadingCustomers}
            >
              <FormControl>
                <Autocomplete
                  disablePortal
                  options={listCustomers || []}
                  sx={{ width: 300, paddingTop: 1 }}
                  onChange={(_, newValue) => {
                    handleChange('customerId', newValue ? newValue.id : null);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Filtrar por cliente"
                      value={filters.customerId}
                    />
                  )}
                />
                {isErrorCustomers && (
                  <Box display="flex" gap={1} marginTop={1}>
                    <Typography variant="caption" color="error">
                      Erro ao carregar a lista de clientes
                    </Typography>
                    <AutorenewIcon onClick={refetchCustomers} />
                  </Box>
                )}
              </FormControl>
            </SkeletonComponent>
          )}
          {hasFilter.date && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  label="Data da entrega"
                  views={['year', 'month', 'day']}
                  format="DD/MM/YYYY"
                  value={
                    filters.startDate ? dayjs(filters.startDate) : undefined
                  }
                  onChange={(e) =>
                    handleChange('startDate', e && new Date(e.toISOString()))
                  }
                />
              </DemoContainer>
            </LocalizationProvider>
          )}
          {hasFilter.time && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoItem sx={{ marginTop: 1 }}>
                <TimePicker
                  ampm={false}
                  label="Filtrar por horário"
                  value={filters.time ? dayjs(filters.time) : null}
                  onChange={(e) => {
                    if (!filters.startDate) {
                      handleChange('startDate', dayjs().toISOString());
                    }
                    handleChange('time', e && e?.toISOString());
                  }}
                />
              </DemoItem>
            </LocalizationProvider>
          )}
          {hasFilter.products && (
            <SkeletonComponent
              width={300}
              height={56}
              sx={{ m: 1 }}
              loading={isLoadingProducts}
            >
              <FormControl sx={{ width: 300, m: 0, marginTop: 1 }}>
                <InputLabel>Filtrar por produtos</InputLabel>
                <Select
                  multiple
                  label="Filtrar por produtos"
                  value={filters.products}
                  onChange={handleChangeProducts}
                  input={<OutlinedInput label="Filtrar por produtos" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {listProducts?.map((product) => (
                    <MenuItem key={product.value} value={product.id}>
                      {product.value}
                    </MenuItem>
                  ))}
                </Select>
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
          )}
        </Box>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={() =>
            setFilters({ ...INITIAL_VALUES_FILTERS, startDate: null })
          }
          sx={{
            marginTop: 1,
            height: 56,
            fontWeight: 600,
          }}
        >
          Limpar filtros
        </Button>
      </Box>
    </Box>
  );
};

export default Filters;
