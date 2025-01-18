import React, { useEffect } from 'react';
import { useGetProductsQuery } from '../../redux/Products.api';
import TableRender from '../../../../commons/components/TableRender';
import { IProduct } from '../../utils/interfaces/IProduct';
import EmptyState from '../../../../commons/components/EmptyState';
import ProductList from '../ProductList';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { ProductsActions } from '../../redux/slices/products.slice';

const ProductsContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { currentData, isFetching, isError, refetch } = useGetProductsQuery();

  useEffect(() => {
    dispatch(ProductsActions.setRefetchList({ refetchList: refetch }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <Box sx={{ p: 3, gap: 3, display: 'flex', flexDirection: 'column' }}>
      <TableRender<IProduct>
        columns={[
          { label: 'Produto' },
          { label: 'Tipo', position: 'right' },
          { label: 'Preço unitário', position: 'right' },
          { label: 'Peso unitário (kg)', position: 'right' },
          { label: 'Preço por Quilo', position: 'right' },
          { label: 'Observações', position: 'right' },
          { label: '', position: 'right' },
        ]}
        data={currentData?.output || []}
        emptyState={
          <EmptyState
            title="Não há nenhum produto cadastrado"
            description="Clique em 'Adicionar Produto' para realizar o cadastro de um produto"
          />
        }
        isLoading={isFetching}
        isError={isError}
        renderRow={(rowData: IProduct) => (
          <ProductList refetch={refetch} product={rowData} />
        )}
      />
    </Box>
  );
};

export default ProductsContainer;
