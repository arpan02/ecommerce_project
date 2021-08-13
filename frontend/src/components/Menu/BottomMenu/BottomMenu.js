import React from 'react';
import './BottomMenu.scss';
import PropTypes from 'prop-types';
import { ReactComponent as HomeIcon } from '../../../assets/icons/SVG/home.svg';
import { ReactComponent as WhishListIcon } from '../../../assets/icons/SVG/heart-fill.svg';
import { ReactComponent as CheckoutIcon } from '../../../assets/icons/SVG/input-checked.svg';
import { ReactComponent as CartIcon } from '../../../assets/icons/SVG/add_shopping_cart.svg';
import { ReactComponent as ArrowDown } from '../../../assets/icons/SVG/chevron-small-down.svg';

import { connect } from 'react-redux';
import Cart from '../../Cart/Cart';
import { cartToggle } from '../../../redux/cart/cart.actions';
import { Link, withRouter } from 'react-router-dom';

const BottomMenu = ({ cartToggle, isCartOpen, location }) => {
  let can_expand = false;
  if (location.pathname !== '/') {
    can_expand = true;
  }
  return (
    <nav className="bottom-menu"
      style={can_expand ? { width: '100%' } : { width: '73%' }}
    >
      <Link to="/" className="bottom-menu__item">
        <HomeIcon className="bottom-menu__item__icon" />
        Home
      </Link>

      <Link to="/wish-list" className="bottom-menu__item">
        <WhishListIcon className="bottom-menu__item__icon" />
        WhishList
      </Link>
      <div className="bottom-menu__item">
        <CheckoutIcon className="bottom-menu__item__icon" />
        Checkout
      </div>

      <div className="bottom-menu__item bottom-menu__item--cart"
        style={{ position: 'relative', zIndex: '500' }}
        onClick={cartToggle}
      >
        <CartIcon className="bottom-menu__item__icon" />
        My Cart
        <ArrowDown className="bottom-menu__item__icon" />
        <Cart isOpen={isCartOpen} />
      </div>
    </nav>
  );
};

BottomMenu.propTypes = {
  isAuth: PropTypes.bool,
  user: PropTypes.object,
  cartToggle: PropTypes.func,
  isCartOpen: PropTypes.bool,
  location: PropTypes.object
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  user: state.auth.user,
  isCartOpen: state.cart.isCartOpen
});

export default withRouter(connect(mapStateToProps, { cartToggle })(BottomMenu));
