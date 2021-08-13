import React from 'react';
import PropTypes from 'prop-types';

const CartProductTotal = ({ discounted_price, quantity }) => {
  return (
    <div className="cart-page__item__total">
      {' '}
      &#8377;{Math.floor(discounted_price * quantity)}
    </div>
  );
};

CartProductTotal.propTypes = {
  discounted_price: PropTypes.number,
  quantity: PropTypes.number
};

export default CartProductTotal;
