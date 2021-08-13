const validator = require('validator');

module.exports.validateRegistration = data => {
  const errors = {};

  if (!data.firstName || data.firstName.length === 0) {
    errors.firstName = 'First Name field is required';
  }

  if (!data.lastName || data.lastName.length === 0) {
    errors.lastName = 'Last Name field is required';
  }

  if (!validator.isEmail(data.email)) {
    errors.email = 'Correct Email address  is required';
  }

  if (!data.email || data.email.length === 0) {
    errors.email = 'Email field is required';
  }

  if (data.password && data.password.length < 8) {
    errors.password = 'Password field should have at leash 8 character';
  }

  if (!data.password || data.password.length === 0) {
    errors.password = 'Password field is required';
  }

  if (!data.passwordConfirm || data.passwordConfirm.length === 0) {
    errors.passwordConfirm = 'Confirm Password field is required';
  }

  if (data.passwordConfirm && data.passwordConfirm !== data.password) {
    errors.passwordConfirm = 'Confirm password should match with password';
  }

  return errors;
};
