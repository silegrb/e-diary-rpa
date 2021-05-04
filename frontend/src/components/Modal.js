import React from 'react';
import PropTypes from 'prop-types';
import { Modal as ReacstrapModal, ModalBody } from 'reactstrap';

const Modal = ({ isOpen, children }) => (
  <ReacstrapModal
    isOpen={isOpen}
    size="lg"
    contentClassName="modal-container"
    centered
  >
    <ModalBody>{children}</ModalBody>
  </ReacstrapModal>
);

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.array.isRequired,
};

export default Modal;
