import React from 'react';
import { Skeleton, TableCell, TableRow } from '@mui/material';

interface IProps {
  rows?: number;
  columns?: number;
}

const TableRenderSkeleton: React.FC<IProps> = ({ rows, columns }) => {
  const rowList = [...Array(rows).keys()];
  const columnsList = [...Array(columns).keys()];
  return (
    <>
      {rowList.map((r) => (
        <TableRow sx={{ display: 'flex' }} key={r}>
          {columnsList.map((c) => (
            <TableCell sx={{ flex: 1 }} key={c}>
              <Skeleton width={100} height={22} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default TableRenderSkeleton;
