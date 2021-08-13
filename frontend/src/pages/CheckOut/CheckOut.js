import React from 'react';
import PropTypes from 'prop-types';
import './CheckOut.scss';
import ProductMenu from '../../components/ProductMenu/ProductMenu';
import CheckOutProductList from './CheckProductList/CheckOutProductList';
import { withRouter } from 'react-router-dom';
import StripePayment from '../CartPage/StripePayment/StripePayment';
const CheckOut = ({ location }) => {
  if (!location.cartList) {
    return (
      <div className="check-out__not-exist">
        Please select the Product to buy or go to cart to buy{' '}
      </div>
    );
  }
  return (
    <div className="check-out">
      <h1>CheckOut</h1>
      <ProductMenu />
      <CheckOutProductList cartList={location.cartList} />
      <div className="check-out__total">Total: {location.totalPrice}</div>
      <StripePayment total={location.totalPrice} />
    </div>
  );
};

CheckOut.propTypes = {
  location: PropTypes.object
};

export default withRouter(CheckOut);
