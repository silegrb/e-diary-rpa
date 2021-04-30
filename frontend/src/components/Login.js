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
import { postLogin } from '../client/auth';
import { setUserSession } from '../utils/auth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const notifyError = () => toast.error(error);
  const notifySuccess = () => toast.success('Login successful');

  const handleLogin = () => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await postLogin({ username, password });
        setUserSession({ ...data });
        notifySuccess();
      } catch (e) {
        notifyError();
        setUsername('');
        setPassword('');
        setError(e.response?.data?.message || 'Something went wrong');
      }
      setLoading(false);
    })();
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
                  <Input
                    className="login-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Col>
                <Col xs={{ offset: 1, size: 10 }}>
                  Password
                </Col>
                <Col xs={{ offset: 1, size: 10 }}>
                  <Input
                    type="password"
                    className="login-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
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
