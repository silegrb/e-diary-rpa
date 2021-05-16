import React, { useEffect, useState } from 'react';
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
import Loader from './Loader';
import Done from './Done';
import { MODAL_WAIT_TIME } from '../constants';
import { postStudentGrade } from '../client/grade';
import { getUserId } from '../utils/user';

const STEPS = {
  INITIAL: 'INITIAL',
  LOADING: 'LOADING',
  DONE: 'DONE',
};

const GradeModal = ({
  isOpen,
  handleClose,
  handleUpdateStudentsList,
  students = [],
  subjects = [],
}) => {
  const [subjectsDropdownOpen, setSubjectsDropdownOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [grade, setGrade] = useState(1);
  const [step, setStep] = useState(STEPS.INITIAL);
  const [error, setError] = useState('');

  const handleCancelModal = () => {
    setStep(STEPS.INITIAL);
    setError('');
    setSubjectsDropdownOpen(false);
    setSelectedSubject(null);
    setSelectedStudentId(null);
    setGrade(1);
    handleClose();
  };

  const handleSelectGrade = (value) => setGrade(value);

  const handleGrade = () => {
    if (!selectedSubject) { setError('No subject selected'); return; }
    if (!selectedStudentId) { setError('No student selected'); return; }
    try {
      (async () => {
        setStep(STEPS.LOADING);
        await postStudentGrade({
          value: grade,
          studentID: selectedStudentId,
          professorID: getUserId(),
          subjectID: selectedSubject.id,
        });
        setStep(STEPS.DONE);
      })();
    } catch (e) {
      setError('Something went wrong');
      setStep(STEPS.INITIAL);
    }
  };

  useEffect(() => {
    if (step === STEPS.DONE) {
      setTimeout(() => {
        handleCancelModal();
        handleUpdateStudentsList(selectedStudentId);
      }, MODAL_WAIT_TIME);
    }
  }, [step]);

  const renderSteps = () => {
    switch (step) {
      case STEPS.INITIAL:
        return (
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
            <div className="w-100 error-container d-flex justify-content-center align-items-center">{error}</div>
            <div className="flex-grow-1 d-flex justify-content-center">
              <div className="w-75">
                <Row>
                  <Col xs={12}>Pick a subject</Col>
                  <Col xs={12}>
                    <Dropdown className="w-100" isOpen={subjectsDropdownOpen} toggle={() => setSubjectsDropdownOpen(!subjectsDropdownOpen)}>
                      <DropdownToggle className="d-flex justify-content-start w-100 subject-picker">
                        {selectedSubject?.name || <div className="no-subject-picked">No subject picked</div>}
                      </DropdownToggle>
                      <DropdownMenu className="w-100 subject-items-container">
                        {subjects.map(({ name, _id: id }, index) => (
                          <DropdownItem
                            className={cs('subject-item', {
                              'border-top-white': index,
                            })}
                            key={index}
                            onClick={() => setSelectedSubject({ name, id })}
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
              <Button className="grade-button-lg" onClick={handleGrade}>Grade</Button>
            </div>
          </div>
        );
      case STEPS.LOADING:
        return (
          <Loader />
        );
      case STEPS.DONE:
        return (
          <Done />
        );
      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen}>
      {renderSteps()}
    </Modal>
  );
};

GradeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  subjects: PropTypes.array.isRequired,
  students: PropTypes.array.isRequired,
  handleUpdateStudentsList: PropTypes.func.isRequired,
};

export default GradeModal;
