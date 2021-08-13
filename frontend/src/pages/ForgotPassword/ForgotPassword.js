// import PropTypes from 'prop-types';
import '../../components/FormInput/FormInput';
import './ForgotPassword.scss';
import React, { Component } from 'react';
import ForgotPasswordForm from './ForgotPasswordForm/ForgotPasswordForm';
import axios from 'axios';
import Spinner from '../../components/Spinner/Spinner';
export class ForgotPassword extends Component {
  static propTypes = {};

  constructor() {
    super();
    this.state = {
      email: '',
      error: '',
      isSuccess: false,
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
      this.setState({ isLoading: true });
      const result = await axios.post('/auth/forgot-password', {
        email: this.state.email
      });
      this.setState({
        isSuccess: true,
        isLoading: false
      });

      console.log(result);
    } catch (error) {
      this.setState({
        error: error.response.data.message,
        isLoading: false
      });
      console.log(error.response);
    }
  };

  render() {
    const { isLoading } = this.state;
    return (
      <div className="forgot-password">
        <div className="forgot-password__container">
          {isLoading ? (
            <Spinner />
          ) : this.state.isSuccess ? (
            <div className="forgot-password__success">
              {' '}
              Token sent to mail successfully.Please check your email{' '}
            </div>
          ) : (
            <ForgotPasswordForm
              onChangeHandler={this.onChangeHandler}
              error={this.state.error}
              onSubmitHandler={this.onSubmitHandler}
            />
          )}
        </div>
      </div>
    );
  }
  1;
}

export default ForgotPassword;
