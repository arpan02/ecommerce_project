import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CustomButton from '../../../components/CustomButton/CustomButton';
import { connect } from 'react-redux';
import { updatePassword } from '../../../redux/auth/auth.actions';

export class ChangePassword extends Component {
  static propTypes = {
    style: PropTypes.object,
    updatePassword: PropTypes.func
  };

  constructor() {
    super();
    this.state = {
      password: '',
      passwordConfirm: '',
      passwordCurrent: ''
    };
  }

  onInputChange = (event) => {
    if (!this.state.isChanged) {
      this.setState({
        [event.target.name]: event.target.value,
        isChanged: true
      });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  };

  onSubmit = () => {
    const data = {
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm,
      passwordCurrent: this.state.passwordCurrent
    };

    this.props.updatePassword(data);
  };

  render() {
    const { password, passwordConfirm, passwordCurrent } = this.state;
    return (
      <div className="profile__right profile__change-password"
        style={this.props.style}
      >
        <h2>Change Password</h2>
        <label htmlFor="passwordCurrent">Current Password</label>
        <input type="text"
          onChange={this.onInputChange}
          value={passwordCurrent}
          name="passwordCurrent"
          id="passwordCurrent"
        />
        <label htmlFor="password">New Password</label>
        <input type="text"
          onChange={this.onInputChange}
          value={password}
          name="password"
          id="password"
        />
        <label htmlFor="passwordConfirm">Confirm Password</label>
        <input type="text"
          onChange={this.onInputChange}
          value={passwordConfirm}
          name="passwordConfirm"
          id="passwordConfirm"
        />
        <CustomButton type="primary" size="medium" onClick={this.onSubmit}>
          Save Changes
        </CustomButton>
      </div>
    );
  }
}
export default connect(null, { updatePassword })(ChangePassword);
