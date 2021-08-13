import React, { Component } from 'react';
import ResetPasswordForm from './ResetPasswordForm/ResetPasswordForm';
import './ResetPassword.scss';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';

export class ResetPassword extends Component {
  static propTypes = {};

  constructor() {
    super();
    this.state = {
      password: '',
      passwordConfirm: '',
      error: '',
      isLoading: false
    };
  }

  onChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmitHandler = async () => {
    try {
      console.log(this.props);
      this.setState({ isLoading: true });
      const { token } = this.props.match.params;
      console.log(token);
      const result = await axios.post(`/auth/reset-password/${token}`, {
        password: this.state.password,
        passwordConfirm: this.state.passwordConfirm
      });
      this.setState({
        isSuccess: true
      });
      this.setState({ isLoading: false });

      console.log(result);
    } catch (error) {
      this.setState({
        error: error.response.data.message
      });
      console.log(error.response);
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { isLoading } = this.state;
    return (
      <div className="reset-password">
        <div className="reset-password__container">
          {isLoading ? (
            <Spinner />
          ) : (
            <ResetPasswordForm
              password={this.state.password}
              passwordConfirm={this.state.passwordConfirm}
              onChangeHandler={this.onChangeHandler}
              onSubmitHandler={this.onSubmitHandler}
              error={this.state.error}
            />
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(ResetPassword);
