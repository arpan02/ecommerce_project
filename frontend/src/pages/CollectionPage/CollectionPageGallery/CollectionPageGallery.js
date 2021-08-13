import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchCollectionStartAsync,
  fetchFiltersStartAsync
} from '../../../redux/Collection/collections.actions';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import GalleryItem from '../../../components/GalleryItem/GalleryItem';

class CollectionPageGallery extends Component {
  state = {
    slug: null
  };
  static propTypes = {
    products: PropTypes.array,
    fetchCollectionStartAsync: PropTypes.func,
    match: PropTypes.object,
    collectionsList: PropTypes.array
  };

  render() {
    const { collectionsList } = this.props;

    if (collectionsList && collectionsList.length <= 0) {
      return (
        <div className="collection-page__right__not-found">
          No Products Found ! Try different filters or categories
        </div>
      );
    }

    return (
      <div className="collection-page__right__gallery">
        {collectionsList && collectionsList.length > 0
          ? collectionsList.map((ele) => (
              <GalleryItem key={Math.random()} {...ele} />
            ))
          : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  collectionsList: state.collections.collectionsList
});

export default withRouter(
  connect(mapStateToProps, {
    fetchCollectionStartAsync,
    fetchFiltersStartAsync
  })(CollectionPageGallery)
);
