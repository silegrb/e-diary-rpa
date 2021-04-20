import React, { useState } from 'react';
import {
  Button,
  Card,
  Col, Container,
  Input,
  Row,
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import { Fade } from 'react-reveal';
import Loader from './Loader';

const Login = () => {
  // eslint-disable-next-line no-unused-vars
  const [username, setUsername] = useState();
  // eslint-disable-next-line no-unused-vars
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const notifyError = () => toast.error('The username or password you entered is incorrect');

  const notifySuccess = () => toast.success('Login successfull');

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      notifySuccess();
      setLoading(false);
    }, 2000);
  };

  return (
    <Container>
      <Fade left className="w-100">
        <Card className="login-container d-flex justify-content-center align-items-center">
          <ToastContainer className="login-toaster" autoClose={2000} />
          {loading ? <Loader />
            : (
              <Row>
                <Col xs={{ offset: 1, size: 10 }}>
                  Username
                </Col>
                <Col xs={{ offset: 1, size: 10 }} className="pb-1">
                  <Input className="login-input" />
                </Col>
                <Col xs={{ offset: 1, size: 10 }}>
                  Password
                </Col>
                <Col xs={{ offset: 1, size: 10 }}>
                  <Input type="password" className="login-input" />
                </Col>
                <Col xs={{ offset: 1, size: 10 }} className="d-flex justify-content-center pt-3">
                  <Button onClick={handleLogin} className="w-50 login-button">Login</Button>
                </Col>
              </Row>
            )}
        </Card>
      </Fade>
    </Container>
  );
};

export default Login;
