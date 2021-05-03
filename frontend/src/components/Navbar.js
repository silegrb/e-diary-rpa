import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { getAvatarInitials } from '../utils/user';

// eslint-disable-next-line no-unused-vars
const Navbar = ({ handleLogOut }) => (
  <div className="position-fixed w-100 d-flex justify-content-between align-items-center py-2 px-3 navbar-container">
    <div className="navbar-avatar d-flex justify-content-center align-items-center">{getAvatarInitials()}</div>
    <Button onClick={handleLogOut} className="cursor-pointer log-out-button">Log Out</Button>
  </div>
);

Navbar.propTypes = {
  handleLogOut: PropTypes.func.isRequired,
};

export default Navbar;
