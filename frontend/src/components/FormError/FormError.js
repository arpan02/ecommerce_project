import React from 'react';
import PropTypes from 'prop-types';
import './FormError.scss';

const FormError = ({ message }) => {
  return <div className="auth-error">{message}</div>;
};

FormError.propTypes = {
  message: PropTypes.string
};

export default FormError;
