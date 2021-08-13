import React from 'react';
import PropTypes from 'prop-types';
import './CartListItem.scss';
import uniqueId from 'uniqid';

const CartListItem = ({ image, name, quantity, discounted_price }) => {
  return (
    <div className="cart__list__item" key={uniqueId()}>
      <img src={image} alt="hii" className="cart__list__item__img" />
      <div className="cart__list__item__info">
        <h3 className="cart__list__item__info__title">{name}</h3>
        <div className="cart__list__item__info__cost">
          <span className="cart__list__item__info__quantity">
            {quantity} X {'  '}
          </span>
          <span className="cart__list__item__info__price">
            &#8377; {discounted_price}
          </span>
        </div>
      </div>
    </div>
  );
};

CartListItem.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  quantity: PropTypes.number,
  discounted_price: PropTypes.number
};

export default CartListItem;
