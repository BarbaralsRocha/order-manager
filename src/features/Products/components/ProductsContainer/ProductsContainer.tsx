import React, { useState } from 'react';
import { useGetProductsQuery } from '../../redux/Products.api';
import objetToQueryString from '../../../../utils/queryString';
import { IFilters } from '../../utils/interfaces/IFilters';
import { INITIAL_VALUES_FILTERS } from '../../utils/constants/Products.constants';
import TableRender from '../../../../components/TableRender';
import { IProduct } from '../../utils/interfaces/IProduct';
import EmptyState from '../../../../components/EmptyState';
import ProductList from '../ProductList';
// import * as S from './Products.style.tsx';

const ProductsContainer: React.FC = () => {
  const [filters, setFilters] = useState<IFilters>(INITIAL_VALUES_FILTERS);
  const query = objetToQueryString(filters);
  const {
    currentData,
    isFetching,
    isError: isErrorGetOrder,
    refetch,
  } = useGetProductsQuery(query);

  return (
    <TableRender<IProduct>
      columns={[
        { label: 'Cliente' },
        { label: 'Data', position: 'right' },
        { label: 'Horário', position: 'right' },
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
      isError={isErrorGetOrder}
      renderRow={(rowData: IProduct) => (
        <ProductList refetch={refetch} product={rowData} />
      )}
    />
  );
};

export default ProductsContainer;
