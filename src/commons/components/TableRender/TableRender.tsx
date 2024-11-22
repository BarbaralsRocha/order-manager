import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import ServiceFail from '../ServiceFail/ServiceFail';
import TableRenderSkeleton from './TableRenderSkeleton';

interface ColumnConfig {
  label: string;
  position?: 'center' | 'left' | 'right' | 'inherit' | 'justify';
}

interface IProps<T> {
  columns: ColumnConfig[];
  data: T[];
  renderRow: (rowData: T) => JSX.Element;
  emptyState?: JSX.Element;
  isError: boolean;
  isLoading: boolean;
  refetch?: () => void;
}

const TableRender = <T,>({
  columns,
  data,
  renderRow,
  emptyState,
  isError,
  isLoading,
  refetch,
}: IProps<T>) => {
  if (isError) {
    return (
      <TableContainer sx={{ height: '100%', alignItems: 'center' }}>
        <ServiceFail refetch={() => refetch && refetch()} />
      </TableContainer>
    );
  }

  if (isLoading) {
    return (
      <TableContainer>
        <TableRenderSkeleton rows={5} columns={5} />
      </TableContainer>
    );
  }

  if (data.length === 0) {
    return <TableContainer>{emptyState}</TableContainer>;
  }

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                variant="head"
                key={column.label}
                align={column.position || 'left'}
                sx={{ fontWeight: 600 }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>{renderRow(row)}</TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableRender;
