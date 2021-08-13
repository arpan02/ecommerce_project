import React from 'react';
import PropTypes from 'prop-types';

const CartProductPrice = ({ price }) => {
  return <div className="cart-page__item__price">&#8377;{price}</div>;
};

CartProductPrice.propTypes = {
  price: PropTypes.number
};

export default CartProductPrice;
