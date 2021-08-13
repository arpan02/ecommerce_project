import React from 'react';
import PropTypes from 'prop-types';
import FormInput from '../../../components/FormInput/FormInput';
import FormButton from '../../../components/FormButton/FormButton';
import FormError from '../../../components/FormError/FormError';

const ResetPasswordForm = ({
  password,
  passwordConfirm,
  onSubmitHandler,
  onChangeHandler,
  error,
}) => {
  return (
    <div className="reset-password__form">
      <h2>Reset Your password</h2>
      {error ? <FormError message={error} /> : null}
      <FormInput
        placeholder="password"
        onChange={onChangeHandler}
        name="password"
        value={password}
        type="password"
      />
      <FormInput
        placeholder="password Confirm"
        name="passwordConfirm"
        value={passwordConfirm}
        onChange={onChangeHandler}
        type="password"
      />
      <FormButton text="Submit" onClick={onSubmitHandler} />
    </div>
  );
};

ResetPasswordForm.propTypes = {
  password: PropTypes.string,
};

export default ResetPasswordForm;
