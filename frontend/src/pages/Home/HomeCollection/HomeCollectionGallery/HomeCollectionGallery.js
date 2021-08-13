import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'uniqid';
import Spinner from '../../../../components/Spinner/Spinner';
import GalleryItem from '../../../../components/GalleryItem/GalleryItem';
// import GalleryItem from './HomeCollectionGalleryItem/HomeCollectionGalleryItem';

const HomeCollectionGallery = ({ products, isLoading }) => {
  return (
    <div className="home-collection__gallery">
      {isLoading ? (
        <Spinner />
      ) : products && products.length > 0 ? (
        <div className="home-collection__gallery__container">
          {products.map((ele) => (
            <GalleryItem key={uniqueId()} {...ele} />
          ))}
        </div>
      ) : (
        <div className="home-collection__gallery__not-found">
          No products found ! select different category
        </div>
      )}
    </div>
  );
};

HomeCollectionGallery.propTypes = {
  products: PropTypes.array
};

export default HomeCollectionGallery;
