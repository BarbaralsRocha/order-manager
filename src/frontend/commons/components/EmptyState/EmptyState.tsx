import { Box, Typography } from '@mui/material';
import React from 'react';
import InfoIcon from '@mui/icons-material/Info';

interface IProps {
  title: string;
  description: string;
}

const EmptyState: React.FC<IProps> = ({ title, description }) => {
  return (
    <Box
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      display="flex"
      gap={2}
    >
      <InfoIcon color="info" fontSize="large" />
      <Box
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        display="flex"
      >
        <Typography variant="h6">{title}</Typography>
        <Typography variant="subtitle1">{description}</Typography>
      </Box>
    </Box>
  );
};

export default EmptyState;
