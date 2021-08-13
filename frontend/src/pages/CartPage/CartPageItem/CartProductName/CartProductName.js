import React from 'react';
import PropTypes from 'prop-types';

const CartProductName = ({ name }) => {
  return <div className="cart-page__item__product-name">{name}</div>;
};

CartProductName.propTypes = {
  name: PropTypes.string
};

export default CartProductName;
