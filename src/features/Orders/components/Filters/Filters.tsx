import {
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
import React, { useCallback } from 'react';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { useGetProductsListQuery } from '../../redux/Orders.api';
import { IFilters } from '../../interfaces/IOrder.interface';
import SkeletonComponent from '../../../../components/SkeletonComponent';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import { INITIAL_VALUES_FILTERS } from '../../utils/constants/Order.constant';

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
  } = useGetProductsListQuery();

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
      <Box display="flex" gap={2} sx={{ paddingLeft: 0 }} alignItems="flex-end">
        <Box
          display="flex"
          gap={2}
          sx={{ paddingLeft: 0 }}
          alignItems="flex-start"
        >
          {hasFilter.customer && (
            <TextField
              sx={{ m: 0, marginTop: 1 }}
              id="outlined-basic"
              label="Filtrar por cliente"
              variant="outlined"
              value={filters.customerName}
              onChange={(e) => handleChange('customerName', e.target.value)}
            />
          )}
          {hasFilter.date && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  label="Data da entrega"
                  views={['year', 'month', 'day']}
                  format="DD/MM/YYYY"
                  value={filters.date ? dayjs(filters.date) : undefined}
                  onChange={(e) => handleChange('date', e && e.toISOString())}
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
                  value={filters.time ? dayjs(filters.time) : undefined}
                  onChange={(e) => handleChange('time', e && e.format('HH:mm'))}
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
                  {currentDataProducts?.output.map((product) => (
                    <MenuItem key={product.value} value={product.value}>
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
          onClick={() => setFilters(INITIAL_VALUES_FILTERS)}
          sx={{
            paddingTop: 0,
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
