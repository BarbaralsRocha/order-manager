import { TableCell } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Measurement } from '../../utils/types/Order.type';

interface IProps<T> {
  rowData: T;
  editProduct?: () => void;
  deleteProduct?: () => void;
}

const OrderListItems = <
  T extends {
    name: string | null;
    quantity: number | null;
    type: Measurement | null;
    additionalInformations: string | null;
  },
>({
  rowData,
  editProduct,
  deleteProduct,
}: IProps<T>) => {
  return (
    <>
      <TableCell component="th" scope="row">
        {rowData.name}
      </TableCell>
      <TableCell align="right">{rowData.type}</TableCell>
      <TableCell align="right">{rowData.quantity}</TableCell>
      <TableCell align="right">{rowData.additionalInformations}</TableCell>
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
