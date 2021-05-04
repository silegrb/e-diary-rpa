import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Container } from 'reactstrap';
import cs from 'classnames';
import { getUserId } from '../utils/user';
import { fetchStudentGrades } from '../client/grade';
import MyGrade from '../components/MyGrade';
import Loader from '../components/Loader';
import { roundToTwoDecimals } from '../utils/calculations';

const Grades = ({ student = null }) => {
  const id = student ? student.id : getUserId();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await fetchStudentGrades(id);
      setSubjects(data);
      setLoading(false);
    })();
  }, []);

  return (
    <Container className={cs('h-100 w-100 p-0 m-0', {
      'my-grades-container': !student,
      'pt-2': student,
    })}
    >
      {loading ? (
        <Loader />
      )
        : (
          <Row className="w-100 m-0">
            <Col xs={12} className="my-grades-title pb-3 d-flex align-items-center justify-content-between">
              <span>{student ? `${student.name} ${student.surname}` : 'My grades'}</span>
              <span>
                {`Average: ${
                  subjects.length && subjects.find(({ grades }) => grades.length)
                    ? roundToTwoDecimals(subjects.reduce((acc, { grades }) => acc + grades.reduce(
                      (gradeAcc, { value }) => gradeAcc + value, 0,
                    ), 0) / subjects.reduce((acc, { grades }) => acc + grades.length, 0))
                    : 0
                }`}
              </span>
            </Col>
            {subjects.map(({ name, grades }, index) => (
              <Col
                key={index}
                xs={12}
                className={cs({
                  'mt-2': index,
                })}
              >
                <MyGrade name={name} grades={grades} />
              </Col>
            ))}
          </Row>
        )}
    </Container>
  );
};

Grades.propTypes = {
  student: PropTypes.object,
};

export default Grades;
