import React from 'react';
import './FormButton.scss';
import PropTypes from 'prop-types';

const FormButton = ({ text, isLoading, ...otherProps }) => {
  return (
    <button className="form-button" {...otherProps} type="button">
      {isLoading ? 'loading' : text}
    </button>
  );
};

FormButton.propTypes = {
  text: PropTypes.string,
  isLoading: PropTypes.bool
};

export default FormButton;
