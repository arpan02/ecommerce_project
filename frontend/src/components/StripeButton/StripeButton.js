import React from 'react';
import PropTypes from 'prop-types';
import StripeCheckout from 'react-stripe-checkout';

const StripeButton = ({ price }) => {
  const priceForStripe = price * 1000;
  const publishAbleKey = 'pk_test_NOEs2mFce4FYQQ85fZINbMdn00J7xc1lwz';

  const onToken = async (token) => {
    console.log(token);
    alert('payment successful');

    // const body = {
    // token,
    // product: 'cart'
    // };
    // const result = await axios.post('bookings/checkout-session', body);
    // console.log(result);
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="E buy"
      billingAddress
      shippingAddress
      image="https://sendeyo.com/up/d/f3eb2117da"
      description={`Your total is ${price}`}
      amount={priceForStripe}
      token={onToken}
      stripeKey={publishAbleKey}
    />
  );
};

StripeButton.propTypes = {
  price: PropTypes.number
};

export default StripeButton;
