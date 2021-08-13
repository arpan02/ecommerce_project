import React from 'react';
import './CategoryGallery.scss';
import laptopImage from '../../assets/images/gallery/g_computers.jpg';
import speakerImage from '../../assets/images/gallery/g_speaker.jpg';
import gameImage from '../../assets/images/gallery/g_gaming.jpg';
import bookImage from '../../assets/images/gallery/g_books.jpg';
import img from '../../assets/images/gallery/g_clothes.jpg';
import CategoryGalleryItem from './CategoryGalleryItem/CategoryGalleryItem';

const CategoryGallery = () => {
  return (
    <section className="category-gallery">
      <CategoryGalleryItem
        title="Clothes"
        link="clothing"
        isFirst
        imageUrl={img}
      />
      <CategoryGalleryItem
        link="computers"
        title="Mobile and computers"
        imageUrl={laptopImage}
      />
      <CategoryGalleryItem title="Electronics" imageUrl={speakerImage} />
      <CategoryGalleryItem
        title="Movies and games"
        imageUrl={gameImage}
        link="gaming"
      />
      <CategoryGalleryItem link="ebooks" title="Books" imageUrl={bookImage} />
    </section>
  );
};

export default CategoryGallery;
