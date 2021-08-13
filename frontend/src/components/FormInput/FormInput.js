import React from 'react';
import './FormInput.scss';
import PropTypes from 'prop-types';

const FormInput = ({ onChangeHandler, label, error, ...otherProps }) => {
  return (
    <div className={`form-group`}>
      <input
        onChange={onChangeHandler}
        {...otherProps}
        className={`form-group__input ${
          error ? 'form-group__input--error' : null
        } `}
      />
      {label ? <label className="form-group__label">{label}</label> : null}
      {error ? <div className="form-group__error">{error}</div> : null}
    </div>
  );
};

FormInput.propTypes = {
  onChangeHandler: PropTypes.func,
  label: PropTypes.string,
  error: PropTypes.string
};

// 12:00 to 6:00 project
//  6:00 to 10:00 project

export default FormInput;
