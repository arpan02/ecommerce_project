import React from 'react';
import PropTypes from 'prop-types';
import './GalleryItem.scss';
import { ReactComponent as CartIcon } from '../../assets/icons/SVG/cart.svg';
import { ReactComponent as HeartIcon } from '../../assets/icons/SVG/heart.svg';

import { connect } from 'react-redux';
import { addToCart } from '../../redux/cart/cart.actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { addToWishList } from '../../redux/wish-list/wish-list.actions';

toast.configure();

const GalleryItem = ({
  image,
  discounted_price,
  name,
  addToCart,
  addToWishList,
  ...props
}) => {
  const onAddToCart = () => {
    const data = {
      image: image[0],
      name,
      discounted_price,
      _id: props._id
    };
    addToCart(data, toast);
  };

  const toLink = {
    pathname: '/check-out',
    cartList: [{ name, image, retail_price: discounted_price, quantity: 1 }],
    totalPrice: discounted_price
  };

  return (
    <div className="gallery-item" key={Math.random() * Math.random()}>
      <img className="gallery-item__img" src={image[0]} alt={name} />
      <div className="gallery-item__name">{name}</div>
      <div className="gallery-item__price"> &#8377; {discounted_price}</div>

      <div className="gallery-item__buttons">
        <button className="gallery-item__buttons__cart" onClick={onAddToCart}>
          <CartIcon className="gallery-item__buttons__icon" />
        </button>
        <button className="gallery-item__buttons__wish-list">
          <HeartIcon
            className="gallery-item__buttons__icon"
            onClick={() => addToWishList(props._id)}
          />
        </button>
        <Link to={toLink} className="gallery-item__buttons__buy-now">
          buy
        </Link>
      </div>
    </div>
  );
};

GalleryItem.propTypes = {
  image: PropTypes.array,
  discounted_price: PropTypes.number,
  name: PropTypes.string,
  addToCart: PropTypes.func,
  _id: PropTypes.string
};

export default connect(null, { addToCart, addToWishList })(GalleryItem);
