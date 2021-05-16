import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ChevronRight, ChevronDown } from 'react-feather';
import { Row, Col, Collapse } from 'reactstrap';
import MyGradeCircles from './MyGradeCircles';
import { roundToTwoDecimals } from '../utils/calculations';

const MyGrade = ({ name, grades = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="my-grade-container cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
      <Row className="m-0 p-2">
        <Col xs={12} className="d-flex justify-content-between">
          <div>
            {isOpen ? <ChevronDown /> : <ChevronRight />}
            <span className="pl-3">{name}</span>
          </div>
          <div>{`Average: ${grades.length ? roundToTwoDecimals(grades.reduce((acc, { value }) => acc + value, 0) / grades.length) : 0}`}</div>
        </Col>
        <Col xs={12}>
          <Collapse isOpen={isOpen}>
            {grades.length ? grades.map(({ value, gradedBy }) => (
              <div className="d-block d-sm-flex justify-content-between pl-5 mt-2">
                <div className="d-flex align-items-center">{`Graded by: ${gradedBy}`}</div>
                <MyGradeCircles value={value} />
              </div>
            )) : <div className="pl-5">No grades</div>}
          </Collapse>
        </Col>
      </Row>
    </div>
  );
};

MyGrade.propTypes = {
  name: PropTypes.string.isRequired,
  grades: PropTypes.array.isRequired,
};

export default MyGrade;
