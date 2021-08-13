import React from 'react';
import './Cart.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CartButtons from './CartButtons/CartButtons';
import CartList from './CartList/CartList';
import CartTotal from './CartTotal/CartTotal';

const Cart = ({ isOpen, cartList }) => {
  return (
    <div className="cart"
      style={isOpen ? { display: 'block' } : { display: 'none' }}
    >
      <CartList cartList={cartList} />
      <CartTotal />
      <CartButtons />
    </div>
  );
};

Cart.propTypes = {
  isOpen: PropTypes.bool,
  cartList: PropTypes.array
};

const mapStateToProps = (state) => ({
  isOpen: state.cart.isCartOpen,
  cartList: state.cart.cartList
});

export default connect(mapStateToProps)(Cart);
