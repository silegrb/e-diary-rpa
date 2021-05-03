import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ChevronRight, ChevronDown } from 'react-feather';
import { Row, Col, Collapse } from 'reactstrap';
import cs from 'classnames';
import MyGradeCircles from './MyGradeCircles';

const MyGrade = ({ name, grades = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="my-grade-container cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
      <Row className="m-0 p-2">
        <Col xs={12}>
          {isOpen ? <ChevronDown /> : <ChevronRight />}
          <span className="pl-3">{name}</span>
        </Col>
        <Col xs={12}>
          <Collapse isOpen={isOpen}>
            {grades.length ? grades.map(({ value }, index) => (
              <div className={cs('d-flex justify-content-between pl-5', {
                'mt-2': index,
              })}
              >
                <div className="d-flex align-items-center">Graded by: </div>
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
