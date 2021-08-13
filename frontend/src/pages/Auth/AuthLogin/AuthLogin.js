import React, { Component } from 'react';
import './AuthLogin.scss';
import FormInput from '../../../components/FormInput/FormInput';
import FormButton from '../../../components/FormButton/FormButton';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { singInUser } from '../../../redux/auth/auth.actions';
import _loadash from 'lodash';

export class AuthLogin extends Component {
  static propTypes = {
    authToggle: PropTypes.func,
    isOpen: PropTypes.bool,
    singInUser: PropTypes.func,
  };

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }
  onChangeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = () => {
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.singInUser(userData);
  };

  componentDidMount() {
    if (!_loadash.isEmpty(this.props.errors)) {
      this.setState({ errors: this.props.errors });
    }
  }

  render() {
    const { authToggle, isOpen, loginError } = this.props;

    return (
      <form
        className="auth-login"
        style={isOpen ? { left: '0%' } : { left: '-100%' }}
      >
        <h3 className="auth__header">Sign In</h3>
        {loginError ? (
          <div className="auth-login__error">{loginError}</div>
        ) : null}
        <FormInput
          onChange={this.onChangeHandler}
          value={this.state.email}
          type="email"
          placeholder="Email"
          name="email"
        />
        <FormInput
          onChange={this.onChangeHandler}
          value={this.state.password}
          type="password"
          placeholder="Password confirm"
          name="password"
        />
        <FormButton text="Login" onClick={this.onSubmit} />
        <div className="auth__options">
          {/* <div>forgot password ?</div> */}
          <div onClick={authToggle}>create Account</div>
        </div>
      </form>
    );
  }
}
const mapStateToProps = (state) => ({
  loginError: state.auth.loginError,
});

export default connect(mapStateToProps, { singInUser })(AuthLogin);
