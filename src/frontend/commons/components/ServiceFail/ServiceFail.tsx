import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

interface IProps {
  refetch(): void;
}

const ServiceFail: React.FC<IProps> = ({ refetch }) => {
  return (
    <Box
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      display="flex"
      gap={2}
    >
      <CancelIcon color="error" fontSize="large" />
      <Box
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        display="flex"
      >
        <Typography variant="h6">
          Não foi possível carregar as informações
        </Typography>
        <Typography variant="subtitle1">
          Tente atualizar os dados, caso contrário tente mais tarde
        </Typography>
      </Box>
      <Button
        variant="outlined"
        size="small"
        sx={{
          color: 'neutral.dark.contrastText',
          borderColor: 'neutral.dark.contrastText',
          borderRadius: 0,
          letterSpacing: 1,
          p: 1,
          paddingLeft: 2,
          paddingRight: 2,
          '&:hover': {
            borderColor: 'neutral.light.light',
            backgroundColor: 'neutral.light.light',
          },
        }}
        onClick={refetch}
      >
        Tentar novamente
      </Button>
    </Box>
  );
};

export default ServiceFail;
