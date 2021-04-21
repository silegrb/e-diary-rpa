import React from 'react';
import { Row, Col } from 'reactstrap';
import { Fade } from 'react-reveal';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ROUTES } from './constants';
import 'react-toastify/dist/ReactToastify.css';
import { version } from '../package.json';

const App = () => (
  <div className="root">
    <div className="app-container d-flex flex-column">
      <Row className="w-100 flex-grow-1">
        <Col xs={5} className="d-flex justify-content-center align-items-center pl-5">
          <Router>
            <Switch>
              {ROUTES.map(({ component, path }, index) => (
                <Route
                  key={index}
                  exact
                  path={path}
                  component={component}
                />
              ))}
              <Route>Page not found</Route>
            </Switch>
          </Router>
        </Col>
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
      </Row>
      <Row className="w-100">
        <Col xs={12} className="d-flex justify-content-center pb-3">
          {`Razvoj poslovnih aplikacija | Version  ${version}`}
        </Col>
      </Row>
    </div>
  </div>
);

export default App;
