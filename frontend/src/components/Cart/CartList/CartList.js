import React from 'react';
import PropTypes from 'prop-types';
import CartListItem from './CartListItem/CartListItem';
import './CartList.scss';

const CartList = ({ cartList }) => {
  return (
    <div className="cart__list">
      {cartList.length > 0
        ? cartList.map((ele) => <CartListItem {...ele} key={Math.random()} />)
        : null}
    </div>
  );
};

CartList.propTypes = {
  cartList: PropTypes.array
};

export default CartList;
