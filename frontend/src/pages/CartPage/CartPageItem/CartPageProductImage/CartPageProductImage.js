import React from 'react';
import PropTypes from 'prop-types';

const CartPageProductImage = ({ image }) => {
  return (
    // <div>
    <img src={image} alt="" className="cart-page__item__img" />
    // {/* </div> */}
  );
};

CartPageProductImage.propTypes = {
  image: PropTypes.string
};

export default CartPageProductImage;
