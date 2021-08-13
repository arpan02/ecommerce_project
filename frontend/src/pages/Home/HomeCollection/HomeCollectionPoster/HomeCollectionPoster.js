import React from 'react';
// import PropTypes from 'prop-types';

const HomeCollectionPoster = ({ img }) => {
  return (
    <div
      className="home-collection__poster"
      style={{ backgroundImage: `url(${img})` }}
    >
      {/* <button className="home-collection__poster__show-more">Show More</button> */}
    </div>
  );
};

HomeCollectionPoster.propTypes = {};

export default HomeCollectionPoster;
