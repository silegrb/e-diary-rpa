import React from 'react';
import PropTypes from 'prop-types';

const MyGradeCircles = ({ value, handleSelectGrade = () => {} }) => (
  <div className="d-flex">
    <div
      className="circle d-flex justify-content-center align-items-center cursor-pointer"
      style={{ opacity: value === 1 ? 1 : 0.3 }}
      onClick={() => handleSelectGrade(1)}
    >
      1
    </div>
    <div
      className="ml-2 circle d-flex justify-content-center align-items-center cursor-pointer"
      style={{ opacity: value === 2 ? 1 : 0.3 }}
      onClick={() => handleSelectGrade(2)}
    >
      2
    </div>
    <div
      className="mx-2 circle d-flex justify-content-center align-items-center cursor-pointer"
      style={{ opacity: value === 3 ? 1 : 0.3 }}
      onClick={() => handleSelectGrade(3)}
    >
      3
    </div>
    <div
      className="mr-2 circle d-flex justify-content-center align-items-center cursor-pointer"
      style={{ opacity: value === 4 ? 1 : 0.3 }}
      onClick={() => handleSelectGrade(4)}
    >
      4
    </div>
    <div
      className="circle d-flex justify-content-center align-items-center cursor-pointer"
      style={{ opacity: value === 5 ? 1 : 0.3 }}
      onClick={() => handleSelectGrade(5)}
    >
      5
    </div>
  </div>
);

MyGradeCircles.propTypes = {
  value: PropTypes.number.isRequired,
  handleSelectGrade: PropTypes.func.isRequired,
};

export default MyGradeCircles;
