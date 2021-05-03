import React, { useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';
import { Fade } from 'react-reveal';
import {
  BrowserRouter as Router, Switch, Redirect, Route,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { toast, ToastContainer } from 'react-toastify';
import { ROLES } from './constants';
import 'react-toastify/dist/ReactToastify.css';
import { version } from '../package.json';
import { getDefaultRedirect, getUserRole } from './utils/user';
import Login from './components/Login';
import Departments from './containers/Departments';
import MyGrades from './containers/MyGrades';
import Navbar from './components/Navbar';
import { unsetUserSession } from './utils/auth';

const App = () => {
  const [role, setRole] = useState(getUserRole());

  const notifySuccess = () => toast.success('Login successful');

  const handleLogIn = (role) => {
    setRole(role);
    notifySuccess();
  };

  const handleLogOut = () => {
    unsetUserSession();
    setRole(null);
  };

  useEffect(() => {
    console.log(role);
  }, [role]);

  return (
    <div className="root">
      <div className="app-container d-flex flex-column">
        <ToastContainer className="login-toaster" autoClose={2000} />
        {role && <Navbar handleLogOut={handleLogOut} />}
        <Row className="w-100 flex-grow-1">
          <Col xs={role ? 12 : 5} className="d-flex justify-content-center align-items-center pl-5">
            <Router history={createBrowserHistory()}>
              <Switch>
                <Route path="/" exact>
                  {role ? <Redirect to={getDefaultRedirect()} /> : <Login handleLogIn={handleLogIn} /> }
                </Route>
                <Route path="/departments" exact>
                  {role === ROLES.TEACHER
                    ? <Departments /> : <Redirect to="/" />}
                </Route>
                <Route path="/my-grades" exact>
                  {role === ROLES.STUDENT ? <MyGrades /> : <Redirect to="/" />}
                </Route>
                <Redirect to={getDefaultRedirect()} exact />
              </Switch>
            </Router>
          </Col>
          {!role && (
          <Col xs={{ offset: 2, size: 5 }} className="d-flex justify-content-center align-items-center pr-5">
            <Row className="w-100 m-0 p-0">
              <Col xs={12} className="d-flex justify-content-center app-e-diary">
                <Fade right>E-DIARY</Fade>
              </Col>
              <Col xs={12} className="d-flex justify-content-center pt-5 app-e-diary">
                <Fade right>E-DIARY</Fade>
              </Col>
              <Col xs={12} className="d-flex justify-content-center py-5 app-e-diary">
                <Fade right>E-DIARY</Fade>
              </Col>
              <Col xs={12} className="d-flex justify-content-center pb-5 app-e-diary">
                <Fade right>E-DIARY</Fade>
              </Col>
              <Col xs={12} className="d-flex justify-content-center app-e-diary">
                <Fade right>E-DIARY</Fade>
              </Col>
            </Row>
          </Col>
          )}
        </Row>
        <Row className="w-100">
          <Col xs={12} className="d-flex justify-content-center pb-3">
            {`Razvoj poslovnih aplikacija | Version  ${version}`}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default App;
