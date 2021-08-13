import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './CartTotal.scss';

const CartTotal = ({ total }) => {
  return (
    <div className="cart__total">
      <span className="cart__total__text">total:</span>
      <span className="cart__total__price">&#8377;{total}</span>
    </div>
  );
};

CartTotal.propTypes = {
  total: PropTypes.number
};

const mapStateToProps = (state) => ({
  total: state.cart.total
});

export default connect(mapStateToProps)(CartTotal);
