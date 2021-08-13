import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as AddIcon } from '../../../../assets/icons/SVG/plus.svg';
import { ReactComponent as SubtractIcon } from '../../../../assets/icons/SVG/minus.svg';
import { toggleQuantity } from '../../../../redux/cart/cart.actions';
import { connect } from 'react-redux';
const CartProductQuantity = ({
  productId,
  cartItemId,
  quantity,
  index,
  toggleQuantity
}) => {
  return (
    <div className="cart-page__item__quantity">
      <div>
        <button className="cart-page__item__quantity__add"
          onClick={() =>
            toggleQuantity({
              productId,
              cartItemId,
              quantity,
              index,
              operation: 'increment'
            })
          }
        >
          <AddIcon />
        </button>
        <span>{quantity}</span>
        <button onClick={() =>
            toggleQuantity({
              productId,
              cartItemId,
              quantity,
              index,
              operation: 'decrement'
            })
          }
        >
          <SubtractIcon />
        </button>
      </div>
    </div>
  );
};

CartProductQuantity.propTypes = {
  productId: PropTypes.string,
  cartItemId: PropTypes.string,
  quantity: PropTypes.number,
  index: PropTypes.number,
  toggleQuantity: PropTypes.func
};

export default connect(null, { toggleQuantity })(CartProductQuantity);
