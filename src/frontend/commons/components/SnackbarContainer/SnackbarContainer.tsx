import { Alert, Snackbar } from '@mui/material';
import React from 'react';
import useSnackBar from '../../hooks/useSnackbar';

const SnackbarContainer: React.FC = () => {
  const { snackbar, handleCloseSnackbar } = useSnackBar();
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={snackbar.open}
      autoHideDuration={5000}
      onClose={handleCloseSnackbar}
      message="I love snacks"
      key={'top' + 'right'}
    >
      <Alert variant="filled" severity={snackbar.type}>
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarContainer;
