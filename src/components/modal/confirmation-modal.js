import React from 'react';
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap';
import PropTypes from 'prop-types';

const ConfirmationModal = (props) => {
  const {
    isLoading = false,
    heading,
    children,
    modalOpen,
    toggleModal,
    cancelButtonText,
    handleCancelButton,
    confirmButtonText,
    handleConfirmButton,
    isCancelButton,
    isConfirmButton,
  } = props;
  return (
    <Modal toggle={toggleModal} isOpen={modalOpen} centered={true}>
      <div className=" modal-header">
        <h5 className=" modal-title" id="exampleModalLabel">
          {heading || ''}
        </h5>
        <button
          aria-label="Close"
          className=" close"
          type="button"
          onClick={toggleModal}
          disabled={isLoading}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <ModalBody>{children}</ModalBody>
      <ModalFooter>
        {isCancelButton && (
          <Button
            disabled={isLoading}
            color="secondary"
            type="button"
            onClick={handleCancelButton}
          >
            {cancelButtonText || 'Cancel'}
          </Button>
        )}
        {isConfirmButton && (
          <Button
            disabled={isLoading}
            color="primary"
            type="button"
            onClick={handleConfirmButton}
          >
            {confirmButtonText || 'Confirm'}
          </Button>
        )}
      </ModalFooter>
    </Modal>
  );
};
ConfirmationModal.propTypes = {
  isLoading: PropTypes.bool,
  heading: PropTypes.string,
  children: PropTypes.any,
  modalOpen: PropTypes.bool,
  setModalOpen: PropTypes.bool,
  toggleModal: PropTypes.func,
  isCancelButton: PropTypes.bool,
  handleCancelButton: PropTypes.func,
  cancelButtonText: PropTypes.string,
  isConfirmButton: PropTypes.bool,
  handleConfirmButton: PropTypes.func,
  confirmButtonText: PropTypes.string,
};
export { ConfirmationModal };
