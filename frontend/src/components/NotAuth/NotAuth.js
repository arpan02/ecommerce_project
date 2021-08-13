import React from 'react';
import './NotAuth.scss';
import PropTypes from 'prop-types';

const NotAuth = ({ page }) => {
  return <div className="not-auth">Login to access {page} </div>;
};

NotAuth.propTypes = {
  page: PropTypes.string
};

export default NotAuth;
