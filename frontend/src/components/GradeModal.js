import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Check, XCircle,
} from 'react-feather';
import {
  Button,
  Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row,
} from 'reactstrap';
import cs from 'classnames';
import Modal from './Modal';
import MyGradeCircles from './MyGradeCircles';

const GradeModal = ({
  isOpen, handleClose, students = [], subjects = [{ name: 'Mathematics' }, { name: 'Sports' }],
}) => {
  const [subjectsDropdownOpen, setSubjectsDropdownOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [grade, setGrade] = useState(1);

  const handleCancelModal = () => {
    setSubjectsDropdownOpen(false);
    setSelectedSubject(null);
    setSelectedStudentId(null);
    setGrade(1);
    handleClose();
  };

  const handleSelectGrade = (value) => setGrade(value);

  return (
    <Modal isOpen={isOpen}>
      <div className="d-flex flex-column h-100 justify-content-center">
        <div className="d-flex justify-content-end pr-3">
          <XCircle
            size={30}
            color="white"
            onClick={handleCancelModal}
            className="cursor-pointer"
          />
        </div>
        <div className="d-flex justify-content-center grade-student-title">Grade a student</div>
        <div className="flex-grow-1 d-flex justify-content-center">
          <div className="w-75">
            <Row>
              <Col xs={12}>Pick a subject</Col>
              <Col xs={12}>
                <Dropdown className="w-100" isOpen={subjectsDropdownOpen} toggle={() => setSubjectsDropdownOpen(!subjectsDropdownOpen)}>
                  <DropdownToggle className="d-flex justify-content-start w-100 subject-picker">
                    {selectedSubject || <div className="no-subject-picked">No subject picked</div>}
                  </DropdownToggle>
                  <DropdownMenu className="w-100 subject-items-container">
                    {subjects.map(({ name }, index) => (
                      <DropdownItem
                        className={cs('subject-item', {
                          'border-top-white': index,
                        })}
                        key={index}
                        onClick={() => setSelectedSubject(name)}
                      >
                        {name}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </Col>
              <Col xs={12} className="pt-5">Pick a student</Col>
              <Col xs={12}>
                <Row className="students-to-grade-container">
                  {students.map(({
                    id, name, surname,
                  }) => (
                    <Col
                      key={id}
                      xs={12}
                      className="mt-2"
                    >
                      <div
                        className={cs('department-student-item cursor-pointer', {
                          'selected-student': id === selectedStudentId,
                        })}
                        onClick={() => setSelectedStudentId(id)}
                      >
                        <Row className="m-0 p-2">
                          <Col xs={12} className="d-flex justify-content-between">
                            <span>{`${name} ${surname}`}</span>
                            {id === selectedStudentId && <Check size={22} color="white" /> }
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Col>
              <Col xs={12} className="pt-5">Pick a grade</Col>
              <Col xs={12} className="d-flex justify-content-between">
                <MyGradeCircles value={grade} handleSelectGrade={handleSelectGrade} />
              </Col>
            </Row>
          </div>
        </div>
        <div className="d-flex justify-content-end pr-3">
          <Button className="grade-button-lg">Grade</Button>
        </div>
      </div>
    </Modal>
  );
};

GradeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  subjects: PropTypes.array.isRequired,
  students: PropTypes.array.isRequired,
};

export default GradeModal;
