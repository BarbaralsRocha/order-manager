import { TableCell } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { IProductOrder } from '../../interfaces/IOrder.interface';

interface IProps {
  rowData: IProductOrder;
  editProduct?: () => void;
  deleteProduct?: () => void;
}

const OrderListItems = ({ rowData, editProduct, deleteProduct }: IProps) => {
  return (
    <>
      <TableCell component="th" scope="row">
        {rowData.product?.name}
      </TableCell>
      <TableCell align="right">{rowData.type}</TableCell>
      <TableCell align="right">{rowData.quantity || rowData.weight}</TableCell>
      <TableCell align="right">{rowData.additionalInformation}</TableCell>
      {editProduct && deleteProduct && (
        <TableCell align="right">
          {<EditIcon sx={{ marginRight: 2 }} onClick={editProduct} />}
          <DeleteOutlineIcon onClick={deleteProduct} />
        </TableCell>
      )}
    </>
  );
};

export default OrderListItems;
