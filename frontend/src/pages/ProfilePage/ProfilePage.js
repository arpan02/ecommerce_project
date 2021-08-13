import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './ProfilePage.scss';
import CustomButton from '../../components/CustomButton/CustomButton';
import { updateUserInfo } from '../../redux/auth/auth.actions';
import SideMenu from './SideMenu/SideMenu';
import ChangePassword from './ChangePassword/ChangePassword';
import { setSideMenuSubItem } from '../../redux/ui/ui.actions';
import NotAuth from '../../components/NotAuth/NotAuth';
import { withRouter } from 'react-router-dom';

export class ProfilePage extends Component {
  static propTypes = {
    user: PropTypes.object,
    updateUserInfo: PropTypes.func,
    setSideMenuSubItem: PropTypes.func,
    isAuth: PropTypes.bool
  };

  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      isChanged: false,
      selectedImageFile: null,
      prevProps: null,
      selected: 1
    };
  }

  static getDerivedStateFromProps(props, state) {
    // if(props.isAuth)

    // console.log(props);

    if (!props.isAuth) {
      console.log('Not auth bro');
      return null;
    }
    const { firstName, lastName, email } = props.user;

    if (
      state.firstName === '' &&
      state.lastName === '' &&
      state.lastName === ''
    ) {
      return {
        ...state,
        firstName,
        lastName,
        email
      };
    } else {
      return null;
    }
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

  imageFileHandler = (event) => {
    this.setState({ selectedImageFile: event.target.files[0] });
  };

  onSubmit = () => {
    const fd = new FormData();
    fd.append('photo', this.state.selectedImageFile);
    fd.append('firstName', this.state.firstName);
    fd.append('lastName', this.state.lastName);
    fd.append('email', this.state.email);

    const { updateUserInfo } = this.props;
    updateUserInfo(fd);
  };

  onSideMenuClick = (selected) => {
    if (selected <= 0 && selected > 3) {
      return;
    }
    this.setState({ selected });
  };

  componentDidMount() {
    // console.log('here ia m000');
    this.props.setSideMenuSubItem(4);
  }

  render() {
    const { firstName, lastName, email } = this.state;
    const { isAuth } = this.props;

    console.log(this.props.isAuth);
    if (!isAuth) {
      console.log(isAuth, '------------');
      return <NotAuth page="Profile" />;
    }
    return (
      <div className="profile">
        <SideMenu
          user={this.props.user}
          onMenuItemClick={this.onSideMenuClick}
          selected={this.state.selected}
        />
        <div
          className="profile__right profile__info"
          style={
            this.state.selected === 1
              ? { display: 'block' }
              : { display: 'none' }
          }
        >
          <h2>Profile Info</h2>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            onChange={this.onInputChange}
            value={firstName}
            name="firstName"
            id="firstName"
          />
          <label htmlFor="firstName">last Name</label>
          <input
            type="text"
            onChange={this.onInputChange}
            value={lastName}
            name="lastName"
          />
          <label htmlFor="firstName">email</label>
          <input
            type="email"
            onChange={this.onInputChange}
            value={email}
            name="email"
          />
          <label htmlFor="firstName">Address</label>
          <input type="text" name="address" id="" />
          <input
            type="file"
            onChange={this.imageFileHandler}
            style={{ display: 'none' }}
            ref={(fileInput) => (this.fileInput = fileInput)}
          />
          <div className="profile__info__upload-img">
            <button className="" onClick={() => this.fileInput.click()}>
              Change Pic
            </button>
            <span>
              {this.state.selectedImageFile
                ? this.state.selectedImageFile.name
                : null}
            </span>
          </div>
          <CustomButton type="primary" size="medium" onClick={this.onSubmit}>
            Save Changes
          </CustomButton>
        </div>
        <ChangePassword
          style={
            this.state.selected === 2
              ? { display: 'block' }
              : { display: 'none' }
          }
        />

        <div
          className="profile__right profile__setting"
          style={
            this.state.selected === 3
              ? { display: 'block' }
              : { display: 'none' }
          }
        >
          setting
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuth: state.auth.isAuth
});

export default withRouter(
  connect(mapStateToProps, { updateUserInfo, setSideMenuSubItem })(ProfilePage)
);
