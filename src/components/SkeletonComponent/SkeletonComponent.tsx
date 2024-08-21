import React, { ReactNode } from 'react';
import { Skeleton } from '@mui/material';

interface IProps {
  width: number;
  height: number;
  loading: boolean;
  children: ReactNode;
  sx?: object;
  variant?: 'rectangular' | 'text' | 'rounded' | 'circular';
}

const SkeletonComponent: React.FC<IProps> = ({
  width,
  height,
  loading,
  children,
  variant = 'rounded',
  sx,
}) => {
  if (loading) {
    return (
      <Skeleton
        sx={{ ...sx }}
        width={width}
        height={height}
        variant={variant}
      />
    );
  }
  return <>{children}</>;
};

export default SkeletonComponent;
