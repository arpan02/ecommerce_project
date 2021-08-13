import React, { Component } from 'react';
import './Auth.scss';
import { ReactComponent as LogoIcon } from '../../assets/icons/SVG/online-shop.svg';
import AuthLogin from './AuthLogin/AuthLogin';
import AuthRegister from './AuthRegister/AuthRegister';
import { setSideMenuSubItem } from '../../redux/ui/ui.actions';
import { connect } from 'react-redux';
import Spinner from '../../components/Spinner/Spinner';
// import PropTypes from 'prop-types';

export class Auth extends Component {
  static propTypes = {};

  constructor() {
    super();
    this.state = {
      isSignInOpen: true
    };
  }

  authToggle = () => {
    this.setState({ isSignInOpen: !this.state.isSignInOpen });
  };

  componentDidMount() {
    this.props.setSideMenuSubItem(4);
  }

  render() {
    const { isLoading } = this.props;

    return (
      <div className="auth">
        <div className="auth__container">
          <div className="auth__logo">
            <LogoIcon className="auth__logo__icon" />
            <span className="auth__logo__text">eBuy</span>
          </div>
          <div className="auth__right">
            {isLoading ? (
              <Spinner />
            ) : (
              <React.Fragment>
                <AuthLogin
                  authToggle={this.authToggle}
                  isOpen={this.state.isSignInOpen}
                />
                <AuthRegister
                  authToggle={this.authToggle}
                  isOpen={this.state.isSignInOpen}
                />{' '}
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading
});

export default connect(mapStateToProps, { setSideMenuSubItem })(Auth);
