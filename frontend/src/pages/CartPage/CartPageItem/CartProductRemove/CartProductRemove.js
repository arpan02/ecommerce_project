import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as RemoveIcon } from '../../../../assets/icons/SVG/cross.svg';
import { connect } from 'react-redux';
import { removeCartItem } from '../../../../redux/cart/cart.actions';

const CartProductRemove = ({ removeCartItem, cartItemId, index }) => {
  return (
    <div className="cart-page__item__remove">
      <button onClick={() =>
          removeCartItem({
            cartItemId,
            index
          })
        }
      >
        <RemoveIcon />
      </button>
    </div>
  );
};

CartProductRemove.propTypes = {
  removeCartItem: PropTypes.func,
  index: PropTypes.number,
  cartItemId: PropTypes.string
};

export default connect(null, { removeCartItem })(CartProductRemove);
