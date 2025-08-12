import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import WarningIcon from '@mui/icons-material/Warning';

interface IProps {
  title: string;
  secondaryButton: {
    label: string;
    fn: () => void;
  };
  primaryButton: {
    label: string;
    fn: () => void;
  };
}

const DeleteConfirmation: React.FC<IProps> = ({
  title,
  secondaryButton,
  primaryButton,
}) => {
  return (
    <Box display="flex" flexDirection="column" gap={5} alignItems="center">
      <WarningIcon
        color="warning"
        fontSize="large"
        sx={{ cursor: 'default' }}
      />
      <Box display="flex" flexDirection="column" gap={1} alignItems="center">
        <Typography variant="h6" textAlign="center">
          {title}
        </Typography>
        <Typography variant="body2">
          Esta ação nao poderá ser desfeita
        </Typography>
      </Box>
      <Box display="flex" gap={2}>
        <Button variant="outlined" color="primary" onClick={secondaryButton.fn}>
          {secondaryButton.label}
        </Button>
        <Button variant="contained" onClick={primaryButton.fn}>
          {primaryButton.label}
        </Button>
      </Box>
    </Box>
  );
};

export default DeleteConfirmation;
