import React from 'react';
import StripeButton from '../../../components/StripeButton/StripeButton';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const StripPayment = ({ total }) => {
  return (
    <div>
      <div className="cart-page__stripe-payment">
        <StripeButton price={total} />
      </div>
      <h3 style={{
          color: 'grey',
          fontSize: '2rem',
          fontWeight: '400',
          textAlign: 'center'
        }}
      >
        *Use <span style={{ color: 'black' }}>4242424242424242</span> and any
        future date and any digit for cv for testing
      </h3>
    </div>
  );
};

StripPayment.prototype = {
  total: PropTypes.number
};

const mapStateToProps = (state) => ({
  total: state.cart.total
});

export default connect(mapStateToProps)(StripPayment);
