import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Card, CardBody, Col, Container, Row,
} from 'reactstrap';
import cs from 'classnames';
import { fetchDepartments } from '../client/department';
import Loader from '../components/Loader';
import { getDepartmentInitials } from '../utils/department';

const Departments = () => {
  const history = useHistory();
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      // TODO Add error handling
      setLoading(true);
      const { data } = await fetchDepartments();
      setDepartments(data);
      setLoading(false);
    })();
  }, []);

  return (
    <Container className="h-100 w-100 p-0 m-0 my-departments-container">
      {loading ? <Loader /> : (
        <Row className="m-0 w-100">
          <Col xs={12} className="my-departments-title pb-3 d-flex align-items-center justify-content-between">
            My Departments
          </Col>
          {departments?.length ? (
            <>
              <Col xs={12} className="pb-2">Click the department for overview</Col>
              {departments.map(({ _id, name, class: departmentClass }, index) => (
                <Col
                  xs={12}
                  lg={6}
                  key={index}
                  className={cs({
                    'mt-lg-4': index > 1,
                    'mt-4 mt-lg-0': index,
                  })}
                >
                  <Card className="cursor-pointer my-department-container" onClick={() => history.push(`/departments/${_id}`)}>
                    <CardBody>
                      <div className="m-0 p-0 flex-row d-flex">
                        <div className="d-flex align-items-center">
                          <div className="my-department-avatar d-flex justify-content-center align-items-center">
                            {getDepartmentInitials({ name, departmentClass })}
                          </div>
                        </div>
                        <div className="d-flex flex-grow-1 align-items-center">
                          <Row className="m-0 p-0 w-100">
                            <Col xs={12}>
                              <span className="font-weight-bold">NAME: </span>
                              {name}
                            </Col>
                            <Col xs={12}>
                              <span className="font-weight-bold">CLASS: </span>
                              {departmentClass}
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </>
          ) : <Col xs={12}>No departments</Col>}
        </Row>
      )}
    </Container>
  );
};

export default Departments;
