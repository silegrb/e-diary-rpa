import React, { useEffect, useState } from 'react';
import { Row, Col, Container } from 'reactstrap';
import cs from 'classnames';
import { getUserId } from '../utils/user';
import { fetchStudentGrades } from '../client/grade';
import MyGrade from '../components/MyGrade';
import Loader from '../components/Loader';
import { roundToTwoDecimals } from '../utils/calculations';

const MyGrades = () => {
  const id = getUserId();
  // eslint-disable-next-line no-unused-vars
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
    <Container className="h-75 w-100 my-grades-container p-0 m-0">
      {loading ? <Loader />
        : (
          <Row className="w-100 m-0">
            <Col xs={12} className="my-grades-title pb-3 d-flex align-items-center justify-content-between">
              <span>My grades</span>
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

export default MyGrades;
