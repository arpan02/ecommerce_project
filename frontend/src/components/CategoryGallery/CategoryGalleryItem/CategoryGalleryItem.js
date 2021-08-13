import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './CategoryGalleryItem.scss';

const CategoryGalleryItem = ({ title, imageUrl, link, isFirst }) => {
  return (
    <div className={`category-gallery__item ${
        isFirst ? 'category-gallery__item__1' : null
      }`}
    >
      <Link to={`/collection/${link}`}>
        <span className="category-gallery__item__text">{title}</span>
        <div className="category-gallery__item__image"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
      </Link>
    </div>
  );
};

CategoryGalleryItem.propTypes = {
  title: PropTypes.string,
  imageUrl: PropTypes.string,
  link: PropTypes.string,
  isFirst: PropTypes.bool
};

export default CategoryGalleryItem;
