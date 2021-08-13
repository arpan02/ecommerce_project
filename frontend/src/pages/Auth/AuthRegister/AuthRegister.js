import React, { Component } from 'react';
import './AuthRegister.scss';
import FormInput from '../../../components/FormInput/FormInput';
import FormButton from '../../../components/FormButton/FormButton';
import { connect } from 'react-redux';
import { signUpUser } from '../../../redux/auth/auth.actions';
import validator from 'validator';
import _loadash from 'lodash';

import PropTypes from 'prop-types';

export class AuthRegister extends Component {
  static propTypes = {
    authToggle: PropTypes.func,
    isOpen: PropTypes.bool,
    signUpUser: PropTypes.func,
    registerError: PropTypes.object,
    errors: PropTypes.object,
  };

  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
      errors: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: '',
      },
    };
  }

  onChangeHandler = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => {
      const error = { ...this.state.errors };
      // console.log(event.target);
      if (name === 'firstName') {
        console.log(error.firstName);
        if (value.length === 0) {
          error.firstName = 'First Name field is required';
        } else {
          error.firstName = '';
        }
      } else if (name === 'lastName') {
        if (value.length === 0) {
          error.lastName = 'Last Name field is required';
        }
      } else if (name === 'email') {
        let isEmail = true;
        if (!validator.isEmail(value)) {
          isEmail = false;
          error.email = 'Input should be valid email';
        }
        if (value.length === 0) {
          error.email = 'Email field is required';
        } else if (isEmail) {
          error.email = '';
        }
      } else if (name === 'password') {
        if (value.length === 0) {
          error.password = 'Password field is required';
        } else if (value.length < 8) {
          console.log('here dude');
          error.password = 'Password should have min length of 8';
        } else {
          error.password = '';
        }
      } else if (name === 'passwordConfirm') {
        let isMatch = true;
        if (value !== this.state.password) {
          isMatch = false;
          error.passwordConfirm =
            'Confirm Password field should match with password';
        }
        if (value.length === 0) {
          error.passwordConfirm = 'Confirm password field is required';
        } else if (isMatch) {
          error.passwordConfirm = '';
        }
      }

      this.setState({ errors: error });
    });
  };

  componentDidUpdate(prevProps) {
    console.log(prevProps.errors, this.props.errors);
    console.log('here--------------');
    // check if prevProps is different from current props
    if (!_loadash.isEqual(prevProps.errors, this.props.errors)) {
      console.log('here i am');
      this.setState({ errors: this.props.errors });
    }
  }

  componentDidMount() {
    if (!_loadash.isEmpty(this.props.errors)) {
      this.setState({ errors: this.props.errors });
    }
  }

  onSubmit = () => {
    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm,
    };

    const { signUpUser } = this.props;

    signUpUser(newUser);
  };

  render() {
    const { authToggle, isOpen } = this.props;
    // console.log(this.state);
    console.log(this.props);
    return (
      <form
        className="auth-register"
        style={isOpen ? { left: '100%' } : { left: '0%' }}
      >
        <h3 className="auth__header">Sign Up</h3>
        <FormInput
          onChange={this.onChangeHandler}
          value={this.state.firstName}
          type="text"
          placeholder="first Name"
          name="firstName"
          error={this.state.errors.firstName}
        />
        <FormInput
          onChange={this.onChangeHandler}
          value={this.state.lastName}
          type="text"
          placeholder="Last Name"
          name="lastName"
          error={this.state.errors.lastName}
        />
        <FormInput
          onChange={this.onChangeHandler}
          value={this.state.email}
          type="email"
          placeholder="Email"
          name="email"
          error={this.state.errors.email}
        />
        <FormInput
          onChange={this.onChangeHandler}
          value={this.state.password}
          type="password"
          placeholder="Password confirm"
          name="password"
          error={this.state.errors.password}
        />
        <FormInput
          onChange={this.onChangeHandler}
          value={this.state.passwordConfirm}
          type="password"
          placeholder="Password"
          name="passwordConfirm"
          error={this.state.errors.passwordConfirm}
        />

        <FormButton text="SignUp" onClick={this.onSubmit} />
        <div className="auth__options">
          <div onClick={authToggle}>Already have account?</div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.auth.registerError,
  isLoading: state.auth.isLoading,
});

export default connect(mapStateToProps, { signUpUser })(AuthRegister);
