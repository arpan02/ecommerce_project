import React from 'react';
import PropTypes from 'prop-types';
import FormError from '../../../components/FormError/FormError';
import FormButton from '../../../components/FormButton/FormButton';
import FormInput from '../../../components/FormInput/FormInput';
const ForgotPasswordForm = ({
  onChangeHandler,
  error,
  email,
  onSubmitHandler
}) => {
  return (
    <React.Fragment>
      <h2>Forgot password?</h2>
      {error ? <FormError message={error} /> : null}
      <FormInput
        onChange={onChangeHandler}
        name="email"
        value={email}
        placeholder="Enter your email address"
      />
      <FormButton text="submit" onClick={onSubmitHandler} />
    </React.Fragment>
  );
};

ForgotPasswordForm.propTypes = {
  onChangeHandler: PropTypes.func
};

export default ForgotPasswordForm;
