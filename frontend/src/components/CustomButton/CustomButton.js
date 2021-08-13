import React from 'react';
import './CustomButton.scss';
import PropTypes from 'prop-types';

const CustomButton = ({ size, children, type, ...otherProps }) => {
  return (
    <button className={`
      custom-button
      custom-button--${size} 
      custom-button--${type}`}
      {...otherProps}
      type="button"
    >
      {children}
    </button>
  );
};

CustomButton.propTypes = {
  size: PropTypes.string,
  children: PropTypes.string,
  type: PropTypes.string
};

export default CustomButton;
