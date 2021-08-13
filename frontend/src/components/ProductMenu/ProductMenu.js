import React from 'react';
import PropTypes from 'prop-types';
import './ProductMenu.scss';

const ProductMenu = ({ canRemove }) => {
  return (
    <div className="product-menu">
      <div className="product-menu__product-img">
        <h3>Product</h3>
      </div>
      <div className="product-menu__product-name">
        <h3>Product Name</h3>
      </div>
      <div>
        <h3>Price</h3>
      </div>
      <div className="product-menu__quantity">
        <h3>Quantity</h3>
      </div>
      <div>
        <h3>Total</h3>
      </div>
      {canRemove ? (
        <div>
          <h3>Remove</h3>
        </div>
      ) : null}
    </div>
  );
};

ProductMenu.propTypes = {
  canRemove: PropTypes.bool
};

export default ProductMenu;
