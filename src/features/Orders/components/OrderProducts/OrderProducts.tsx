import React from 'react';
import TableRender from '../../../../components/TableRender';
import { ITotalProducts } from '../../interfaces/ITotalProducts.interface';
import { useGetTotalProductsQuery } from '../../redux/Orders.api';
import EmptyState from '../../../../components/EmptyState';
import { Box, TableCell } from '@mui/material';

const OrderProducts: React.FC<{ query: string }> = ({ query }) => {
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
              {product.productName}
            </TableCell>
            <TableCell align="right">{product.total}</TableCell>
          </>
        )}
      />
    </Box>
  );
};

export default OrderProducts;
