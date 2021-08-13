import React from 'react';
import CheckOutProductItem from './CheckProductItem/CheckOutProductItem';
import uniqueId from 'uniqid';
import PropTypes from 'prop-types';

const CheckOutProductList = ({ cartList }) => {
  console.log(cartList);
  return (
    <div className="check-out__product-list">
      {cartList.map((ele) => (
        <CheckOutProductItem key={uniqueId()} {...ele} />
      ))}
    </div>
  );
};

CheckOutProductList.propTypes = {
  cartList: PropTypes.array
};

export default CheckOutProductList;
