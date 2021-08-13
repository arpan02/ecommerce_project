import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as RightArrow } from '../../../../assets/icons/SVG/arrow-right.svg';
import UniqueId from 'uniqid';

const CarouselRightList = ({ list }) => {
  return (
    <div className="carousel__right__list">
      {list.map((ele) => (
        <div className="carousel__right__list__item" key={UniqueId()}>
          <RightArrow className="carousel__right__list__item__icon" />
          <span className="carousel__right__list__item__text">{ele}</span>
        </div>
      ))}
    </div>
  );
};

CarouselRightList.propTypes = {
  list: PropTypes.array
};

export default CarouselRightList;
