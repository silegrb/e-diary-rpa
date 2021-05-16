import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Button, Col, Container, Row,
} from 'reactstrap';
import { ArrowLeft } from 'react-feather';
import cs from 'classnames';
import Loader from '../components/Loader';
import { fetchDepartmentDetails } from '../client/department';
import { roundToTwoDecimals } from '../utils/calculations';
import StudentDetailsModal from '../components/StudentDetailsModal';
import GradeModal from '../components/GradeModal';
import { fetchProfessorSubjects } from '../client/subject';

const DepartmentDetails = () => {
  const history = useHistory();
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [studentDetailsOpen, setStudentDetailsOpen] = useState(false);
  const [gradeModalOpen, setGradeModalOpen] = useState(false);
  const [student, setStudent] = useState(null);
  const [professorSubjects, setProfessorSubjects] = useState([]);

  const handleUpdateStudentsList = async () => {
    const { data } = await fetchDepartmentDetails(id);
    setDetails(data);
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await fetchDepartmentDetails(id);
        const { data: professorSubjectsData } = await fetchProfessorSubjects();
        setProfessorSubjects(professorSubjectsData);
        setDetails(data);
        setLoading(false);
      } catch (e) {
        history.push('/departments');
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Container className="h-100 w-100 p-0 m-0 department-details-container">
      {loading ? <Loader />
        : (
          <Row className="w-100 m-0">
            <Col xs={12} className="d-flex justify-content-end align-items-center" />
            <Col xs={12} className="department-details-title pb-3 d-flex align-items-center justify-content-between">
              <span>{details.name}</span>
              <span>
                {`Average: ${details?.students?.length ? roundToTwoDecimals(
                  details.students.reduce((acc, { gradeAverage }) => acc + gradeAverage, 0) / details.students.length,
                ) : 0}`}
              </span>
            </Col>
            {details?.students?.length ? (
              <>
                <Col xs={12} className="d-flex justify-content-between align-items-center">
                  <span>
                    Click the student for overview
                  </span>
                  <div className="d-flex">
                    <Button
                      className={cs('d-flex align-items-center back-to-departments-button', {
                        'mr-2': details?.students?.length,
                      })}
                      onClick={() => history.push('/departments')}
                    >
                      <ArrowLeft />
                      Back to Deparments
                    </Button>
                    {details?.students?.length
                      ? <Button className="grade-button" onClick={() => setGradeModalOpen(true)}>Grade</Button> : null}
                  </div>
                </Col>
                {details.students.map(({
                  id, name, surname, gradeAverage,
                }, index) => (
                  <Col
                    key={index}
                    xs={12}
                    className="mt-2"
                  >
                    <div
                      className="department-student-item cursor-pointer"
                      onClick={() => {
                        setStudent({ id, name, surname });
                        setStudentDetailsOpen(true);
                      }}
                    >
                      <Row className="m-0 p-2">
                        <Col xs={12} className="d-flex justify-content-between">
                          <span>{`${name} ${surname}`}</span>
                          <span>{`Average: ${gradeAverage}`}</span>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                ))}
              </>
            ) : (
              <Col xs={12} className="d-flex justify-content-between align-items-center">
                <span>No students</span>
                <Button
                  className={cs('d-flex align-items-center back-to-departments-button', {
                    'mr-2': details?.students?.length,
                  })}
                  onClick={() => history.push('/departments')}
                >
                  <ArrowLeft />
                  Back to Deparments
                </Button>
              </Col>
            )}
          </Row>
        )}
      <StudentDetailsModal
        handleClose={() => setStudentDetailsOpen(false)}
        isOpen={studentDetailsOpen}
        student={student}
      />
      <GradeModal
        handleClose={() => setGradeModalOpen(false)}
        isOpen={gradeModalOpen}
        students={details?.students || []}
        subjects={professorSubjects}
        handleUpdateStudentsList={handleUpdateStudentsList}
      />
    </Container>
  );
};

export default DepartmentDetails;
