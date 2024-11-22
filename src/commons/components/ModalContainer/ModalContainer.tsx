import React, { useMemo } from 'react';

import { Box, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { BoxContainer } from './ModalContainer.style';
import useModal from '../../hooks/useModal';

const ModalContainer: React.FC = () => {
  const { modal, handleCloseModal } = useModal();

  const renderComponent = useMemo(() => {
    if (typeof modal.component === 'function') {
      const Component = modal.component;
      return <Component />;
    }
    return modal.component;
  }, [modal.component]);

  return (
    <Modal
      open={modal.open}
      sx={{ top: '50%', left: '50%' }}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <BoxContainer sx={{ p: 4 }}>
        <Box display="flex" justifyContent="flex-end" paddingBottom={3}>
          <CloseIcon onClick={handleCloseModal} />
        </Box>
        {renderComponent}
      </BoxContainer>
    </Modal>
  );
};

export default ModalContainer;
