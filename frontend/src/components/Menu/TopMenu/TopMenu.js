import React from 'react';
import './TopMenu.scss';
import PropTypes from 'prop-types';
import { ReactComponent as LogoIcon } from '../../../assets/icons/SVG/online-shop.svg';
import { ReactComponent as MenuIcon } from '../../../assets/icons/SVG/menu.svg';
import { connect } from 'react-redux';
// import Search from '../../Search/Search';
import { Link } from 'react-router-dom';
import { logOutUser } from '../../../redux/auth/auth.actions';

class TopMenu extends React.Component {
  static propTypes = {
    onMenuBarClick: PropTypes.func,
    isAuth: PropTypes.bool,
    user: PropTypes.object,
    logOutUser: PropTypes.func
  };

  onLinkClick = (event) => {
    if (!this.props.isAuth) {
      return;
    }

    event.preventDefault();
    this.props.logOutUser();
  };

  render() {
    const { onMenuBarClick, user, isAuth } = this.props;
    return (
      <nav className="menu__top">
        <div className="menu__top__side-menu-icon">
          <MenuIcon onClick={onMenuBarClick} />
        </div>
        <Link to="/" className="menu__top__logo">
          <LogoIcon className="menu__top__logo__icon" />
          <span className="menu__top__logo__text">eBuy</span>
        </Link>

        <div className="menu__top__account">
          <Link className="menu__top__account__text"
            onClick={this.onLinkClick}
            to={isAuth ? '#' : '/auth'}
          >
            {isAuth ? 'Logout' : 'Login'}
          </Link>
          {isAuth ? (
            <Link to="/profile" className="menu__top__account__pic">
              <img src={user.photo} alt="" />
            </Link>
          ) : null}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, { logOutUser })(TopMenu);
