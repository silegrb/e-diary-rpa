import React, { useEffect, useState } from 'react';
import { Row, Col, Container } from 'reactstrap';
import cs from 'classnames';
import { getUserId } from '../utils/user';
import { fetchStudentGrades } from '../client/grade';
import MyGrade from '../components/MyGrade';
import Loader from '../components/Loader';

const MyGrades = () => {
  const id = getUserId();
  // eslint-disable-next-line no-unused-vars
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await fetchStudentGrades(id);
      setGrades(data);
      setLoading(false);
    })();
  }, []);

  return (
    <Container className="h-75 w-100 my-grades-container p-0 m-0">
      {loading ? <Loader />
        : (
          <Row className="w-100 m-0">
            <Col xs={12} className="my-grades-title pb-3 d-flex align-items-center">My grades</Col>
            {/* eslint-disable-next-line no-unused-vars */}
            {grades.map(({ name, grades }, index) => (
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
