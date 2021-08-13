import React from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as HomeIcon } from '../../../assets/icons/SVG/home.svg';
import { ReactComponent as WhishListIcon } from '../../../assets/icons/SVG/heart-fill.svg';
import { ReactComponent as CheckoutIcon } from '../../../assets/icons/SVG/input-checked.svg';
import { ReactComponent as UserIcon } from '../../../assets/icons/SVG/user.svg';
import { ReactComponent as CartIcon } from '../../../assets/icons/SVG/add_shopping_cart.svg';
import SubMenuItem from './SubMenuItem/SubMenuItem';
import { connect } from 'react-redux';

class SideMenuSubMenu extends React.Component {
  render() {
    const { isAuth } = this.props;
    return (
      <nav className="side-menu__sub-menu">
        <SubMenuItem Icon={HomeIcon} itemNumber={1} link="/" />
        <SubMenuItem Icon={WhishListIcon} itemNumber={2} link="/wish-list" />
        <SubMenuItem Icon={CheckoutIcon} itemNumber={3} link="/" />
        <SubMenuItem Icon={UserIcon}
          itemNumber={4}
          link={`${isAuth ? '/profile' : '/auth'}`}
        />
        <SubMenuItem Icon={CartIcon} itemNumber={5} link="/cart" />
      </nav>
    );
  }
}

SideMenuSubMenu.propTypes = {
  isAuth: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth
});

export default connect(mapStateToProps)(SideMenuSubMenu);
