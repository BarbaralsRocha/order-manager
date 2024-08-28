import React, { useEffect } from 'react';
import * as S from './ProductList.style';
import useDrawer from '../../../../hooks/useDrawer';
import useModal from '../../../../hooks/useModal';
import useSnackBar from '../../../../hooks/useSnackbar';
import { IProduct } from '../../utils/interfaces/IProduct';
import { useDeleteProductMutation } from '../../redux/Products.api';
import { TableCell } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DeleteConfirmation from '../../../../components/DeleteConfirmation';
import FormFormik from '../../../../components/FormFormik';

interface IProps {
  refetch(): void;
  product: IProduct;
}

const ProductList: React.FC<IProps> = ({ refetch, product }) => {
  const { setComponentAtDrawer } = useDrawer();
  const { handleOpenModal, handleCloseModal } = useModal();
  const { showSnackbar } = useSnackBar();
  const [deleteProduct, { data, isLoading, isError, isUninitialized }] =
    useDeleteProductMutation();

  useEffect(() => {
    if (!isUninitialized) {
      if (isLoading) {
        showSnackbar({ message: 'Salvando dados...', type: 'info' });
        return;
      }
      if (data?.output) {
        handleCloseModal();
        showSnackbar({ message: 'Dados salvos!', type: 'success' });
        refetch();
        return;
      } else {
        showSnackbar({
          message: 'Não foi possivel salvar os dados!',
          type: 'error',
        });
      }
      if (isError) {
        showSnackbar({
          message: 'Não foi possivel salvar os dados!',
          type: 'error',
        });
        return;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.output, isUninitialized, isError, isLoading]);

  return (
    <>
      <TableCell component="th" scope="row" sx={{ p: 0 }}>
        {product.name}
      </TableCell>
      <TableCell align="right" sx={{ p: 0 }}>
        {product.deliveryDate && dateFormat(new Date(product.deliveryDate))}
      </TableCell>
      <TableCell align="right" sx={{ p: 0 }}>
        {product.deliveryDate && timeFormat(new Date(product.deliveryDate))}
      </TableCell>
      <TableCell align="right">
        <EditIcon
          sx={{ marginRight: 2 }}
          onClick={() =>
            setComponentAtDrawer({
              title: 'Editar Encomenda',
              component: (
                <FormFormik
                  initialValues={product}
                  validationSchema={validationSchemaproducts}
                >
                  <ProductRegister labelButton="Editar" />
                </FormFormik>
              ),
            })
          }
        />
        <DeleteOutlineIcon
          onClick={() =>
            handleOpenModal(
              <DeleteConfirmation
                title={`Tem certeza que deseja excluir o produto ${product.name}`}
                secondaryButton={{
                  label: 'Não excluir',
                  fn: handleCloseModal,
                }}
                primaryButton={{
                  label: 'Excluir produto',
                  fn: () =>
                    product.id && deleteProduct({ productId: product.id }),
                }}
              />,
            )
          }
        />
      </TableCell>
    </>
  );
};

export default ProductList;
