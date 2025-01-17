import React, { useEffect, useState } from 'react';
import TableRender from '../../../../commons/components/TableRender';
import { ITotalProducts } from '../../interfaces/ITotalProducts.interface';
import { useGetTotalProductsQuery } from '../../redux/Orders.api';
import EmptyState from '../../../../commons/components/EmptyState';
import { Box, TableCell } from '@mui/material';
import { IFilters } from '../../interfaces/IOrder.interface';
import objetToQueryString from '../../../../../utils/queryString';

const OrderProducts: React.FC<{ filters: IFilters }> = ({ filters }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    if (filters.startDate) {
      const selectedDate = new Date(filters.startDate);
      const adjustedStartDate = new Date(selectedDate);
      selectedDate.setDate(selectedDate.getDate() + 1);
      setStartDate(adjustedStartDate);
      setEndDate(selectedDate);
    }
  }, [filters.startDate]);

  const filtersTotals = {
    ...filters,
    startDate: startDate,
    endDate: endDate,
  };

  const query = objetToQueryString(filtersTotals);
  const { currentData, isFetching, isError, refetch } =
    useGetTotalProductsQuery(query);

  return (
    <Box width="60%">
      <TableRender<ITotalProducts>
        columns={[{ label: 'Produto' }, { label: 'Total', position: 'right' }]}
        data={currentData?.output || []}
        emptyState={
          <EmptyState
            title="Não há nenhum produto adicionado"
            description="Preencha os campos acima e clique no '+' para adicionar"
          />
        }
        isLoading={isFetching}
        isError={isError}
        refetch={refetch}
        renderRow={(product: ITotalProducts) => (
          <>
            <TableCell component="th" scope="row">
              {product.product}
            </TableCell>
            <TableCell align="right">{product.totalOrders}</TableCell>
          </>
        )}
      />
    </Box>
  );
};

export default OrderProducts;
