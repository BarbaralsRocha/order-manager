import React from 'react';
import { IProduct } from '../../utils/interfaces/IProduct';
import { useDeleteProductMutation } from '../../redux/Products.api';
import { TableCell } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { formatCurrency } from '../../../../../utils/formatCurrency';
import useDrawer from '../../../../commons/hooks/useDrawer';
import useModal from '../../../../commons/hooks/useModal';
import FormFormik from '../../../../commons/components/FormFormik';
import DeleteConfirmation from '../../../../commons/components/DeleteConfirmation';
import ProductRegister from '../ProductRegister';
import validationSchemaProducts from '../ProductRegister/validationSchemaProducts';
import useAlertHandler from '../../../../commons/hooks/useAlertHandler';

interface IProps {
  refetch(): void;
  product: IProduct;
}

const ProductList: React.FC<IProps> = ({ refetch, product }) => {
  const { setComponentAtDrawer } = useDrawer();
  const { handleOpenModal, handleCloseModal } = useModal();
  const [deleteProduct, deleteProductMutation] = useDeleteProductMutation();

  useAlertHandler({
    apiResult: deleteProductMutation,
    successMessage: 'Dados salvos!',
    errorMessage: 'Não foi possivel salvar os dados!',
    callback: () => {
      handleCloseModal();
      refetch();
    },
  });

  return (
    <>
      <TableCell component="th" scope="row">
        {product.name}
      </TableCell>
      <TableCell align="right">{product.type}</TableCell>
      <TableCell align="right">{formatCurrency(product.unityPrice)}</TableCell>
      <TableCell align="right">{product.unitaryWeight || '-'}</TableCell>
      <TableCell align="right">{formatCurrency(product.weightPrice)}</TableCell>
      <TableCell align="right">
        {product.additionalInformation || '-'}
      </TableCell>
      <TableCell align="right">
        <EditIcon
          sx={{ marginRight: 2 }}
          onClick={() =>
            setComponentAtDrawer({
              title: 'Editar Produto',
              component: (
                <FormFormik
                  initialValues={product}
                  validationSchema={validationSchemaProducts}
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
