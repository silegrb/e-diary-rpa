import React from 'react';
import PropTypes from 'prop-types';
import { XCircle } from 'react-feather';
import Modal from './Modal';
import Grades from '../containers/Grades';

const StudentDetailsModal = ({ isOpen, handleClose, student }) => (
  <Modal isOpen={isOpen}>
    <div className="d-flex flex-column h-100">
      <div className="d-flex justify-content-end pr-3">
        <XCircle
          size={30}
          color="white"
          onClick={handleClose}
          className="cursor-pointer"
        />
      </div>
      <div className="flex-grow-1">
        <Grades student={student} />
      </div>
    </div>
  </Modal>
);

StudentDetailsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  student: PropTypes.string,
};

export default StudentDetailsModal;
