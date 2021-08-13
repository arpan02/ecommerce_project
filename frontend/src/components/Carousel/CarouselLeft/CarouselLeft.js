import React from 'react';
import PropTypes from 'prop-types';

const CarouselLeft = ({ img }) => {
  return (
    <div className="carousel__left"
      style={{ backgroundImage: `url(${img})` }}
    ></div>
  );
};

CarouselLeft.propTypes = {
  img: PropTypes.string
};

export default CarouselLeft;
