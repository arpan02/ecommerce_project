import React from 'react';

const CartPageMenu = () => {
  return (
    <div className="cart-page__menu">
      <div className="cart-page__menu__product-img">
        <h3>Product</h3>
      </div>
      <div className="cart-page__menu__product-name">
        <h3>Product Name</h3>
      </div>

      <div>
        <h3>Price</h3>
      </div>
      <div className="cart-page__menu__quantity">
        <h3>Quantity</h3>
      </div>
      <div>
        <h3>Total</h3>
      </div>
      <div>
        <h3>Remove</h3>
      </div>
    </div>
  );
};

export default CartPageMenu;
