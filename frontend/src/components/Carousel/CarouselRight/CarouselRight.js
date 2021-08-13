import React from 'react';
import CarouselRightList from './CarouselRightList/CarouselRightList';

const list = [
  'Fit Type: Regular Fit',
  'Suitable for: Sports, Casual, Business Work, Date, Party, Perfect gift for families, friends and boyfriend',
  '100% High-grade Cotton Fabrics: Good capability of tenderness, airpermeability and moisture',
  ' Slim Fit , Fabric: 100% Cotton , Full Sleeve ,Casual Shirts'
];

const CarouselRight = () => {
  return (
    <div className="carousel__right">
      <div className="carousel__right__badge">30% off</div>
      <div className="carousel__right__content">
        <h2 className="carousel__right__title">Full sleeve t-shirt</h2>
      </div>
      <CarouselRightList list={list} />
    </div>
  );
};

export default CarouselRight;
