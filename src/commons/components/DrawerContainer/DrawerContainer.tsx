import React, { useMemo } from 'react';

import { Box, Drawer, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useDrawer from '../../hooks/useDrawer';

const DrawerContainer: React.FC = () => {
  const { handleCloseDrawer, drawer } = useDrawer();

  const renderComponent = useMemo(() => {
    if (typeof drawer.component === 'function') {
      const Component = drawer.component;
      return <Component />;
    }
    return drawer.component;
  }, [drawer.component]);

  return (
    <Drawer open={drawer.isOpen} onClose={handleCloseDrawer} anchor="right">
      <Box
        sx={{
          p: 4,
          paddingBottom: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 500, paddingRight: 4 }}>
          {drawer.title}
        </Typography>
        <CloseIcon onClick={handleCloseDrawer} />
      </Box>
      {renderComponent}
    </Drawer>
  );
};

export default DrawerContainer;
