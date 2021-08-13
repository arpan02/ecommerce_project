import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './CartButtons.scss';

const CartButtons = ({ history }) => {
  const onClick = () => {
    history.push('/cart');
  };

  return (
    <div className="cart__buttons">
      <button onClick={onClick}>View cart</button>
    </div>
  );
};

CartButtons.propTypes = {
  history: PropTypes.object
};

export default withRouter(CartButtons);
