import React from 'react';
import './WishListItem.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addToCart } from '../../../redux/cart/cart.actions';
import { ReactComponent as CartIcon } from '../../../assets/icons/SVG/cart.svg';

const WishListItem = ({ price, width, image, name, addToCart, _id }) => {
  const data = {
    name,
    retail_price: price,
    image,
    _id
  };

  return (
    <div className="wish-list__item" style={{ width: width }}>
      <div className="wish-list__item__img">
        <img src={image} alt="" />
      </div>
      <button className="wish-list__item__cart" onClick={() => addToCart(data)}>
        <CartIcon className="wish-list__item__img__icon" />
      </button>
      <div className="wish-list__item__name">{name}</div>
      <div className="wish-list__item__price">Rs {Math.floor(price)}</div>
    </div>
  );
};

WishListItem.propTypes = {
  price: PropTypes.number,
  img: PropTypes.string,
  width: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string,
  addToCart: PropTypes.func,
  _id: PropTypes.string,
  isWishList: PropTypes.bool
};

export default connect(null, { addToCart })(WishListItem);
