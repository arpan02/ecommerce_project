import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CartPageProductImage from './CartPageProductImage/CartPageProductImage';
import CartProductName from './CartProductName/CartProductName';
import CartProductPrice from './CartProductPrice/CartProductPrice';
import CartProductQuantity from './CartProductQuantity/CartProductQuantity';
import CartProductTotal from './CartProductTotal/CartProductTotal';
import CartProductRemove from './CartProductRemove/CartProductRemove';
import { getCartTotal } from '../../../redux/cart/cart.actions';

export class CartPageItem extends Component {
  static propTypes = {
    cartList: PropTypes.array,
    toggleQuantity: PropTypes.func,
    removeCartItem: PropTypes.func,
    getCartTotal: PropTypes.func,
    total: PropTypes.number
  };

  returnCartItem = (ele, index) => {
    return (
      <div className="cart-page__item" key={Math.random() * Math.random()}>
        <CartPageProductImage image={ele.image} />
        <CartProductName name={ele.name} />
        <CartProductPrice price={ele.discounted_price} />
        <CartProductQuantity productId={ele.productId}
          cartItemId={ele.cartItemId}
          quantity={ele.quantity}
          index={index}
        />
        <CartProductTotal discounted_price={ele.discounted_price}
          quantity={ele.quantity}
        />
        <CartProductRemove cartItemId={ele.cartItemId} index={index} />
      </div>
    );
  };

  render() {
    const { cartList, total } = this.props;
    return (
      <React.Fragment>
        <div className="cart-page__items">
          {cartList.length > 0 ? cartList.map(this.returnCartItem) : null}
        </div>
        <div className="cart-page__total">Total &#8377; : {total} </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  cartList: state.cart.cartList,
  total: state.cart.total
});

export default connect(mapStateToProps, { getCartTotal })(CartPageItem);
