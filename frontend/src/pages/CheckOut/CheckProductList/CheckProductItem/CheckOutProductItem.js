import React from 'react';
import PropTypes from 'prop-types';

const CheckOutProductItem = ({ name, image, retail_price, quantity }) => {
  return (
    <div className="check-out__product-list__item">
      <div className="check-out__product-list__item__image">
        <img src={image} alt="" />
      </div>
      <div className="check-out__product-list__item__name">{name}</div>
      <div className="check-out__product-list__item__price">{retail_price}</div>
      <div className="check-out__product-list__item__quantity">{quantity}</div>
      <div className="check-out__product-list__item__total-price">
        {quantity * retail_price}
      </div>
    </div>
  );
};

CheckOutProductItem.propTypes = {
  name: PropTypes.string,
};

export default CheckOutProductItem;
