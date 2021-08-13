import React, { Component } from 'react';
import './CollectionPage.scss';
import { withRouter } from 'react-router-dom';
import CollectionPageMenu from './CollectionPageMenu/CollectionPageMenu';
import Pagination from '../../components/Pagination/Pagination';
import CollectionPageGallery from './CollectionPageGallery/CollectionPageGallery';
import { connect } from 'react-redux';
import Spinner from '../../components/Spinner/Spinner';
import PropTypes from 'prop-types';
import {
  fetchCollectionStartAsync,
  fetchFiltersStartAsync,
  resetCollection
} from '../../redux/Collection/collections.actions';
import { ReactComponent as SideMeNuIcon } from '../../assets/icons/SVG/cog.svg';
import CollectionPageSideMenu from './CollectionPageSideMenu/CollectionPageSideMenu';

class CollectionPage extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    fetchCollectionStartAsync: PropTypes.func,
    match: PropTypes.object,
    collectionsList: PropTypes.array,
    fetchFiltersStartAsync: PropTypes.func,
    resetCollection: PropTypes.func
  };

  constructor() {
    super();
    this.state = {
      slug: null,
      isSideMenuOpen: false
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { slug } = props.match.params;
    if (slug !== state.slug) {
      const st = { slug };
      return st;
    }
    return null;
  }

  componentDidMount() {
    const { fetchCollectionStartAsync, fetchFiltersStartAsync } = this.props;
    if (this.state.slug) {
      fetchCollectionStartAsync(this.state.slug, 1);
      fetchFiltersStartAsync(this.state.slug);
    }
  }

  componentDidUpdate(prevProps) {
    const { fetchCollectionStartAsync, fetchFiltersStartAsync } = this.props;
    if (this.state.slug !== prevProps.match.params.slug) {
      fetchCollectionStartAsync(this.state.slug);
      fetchFiltersStartAsync(this.state.slug);
    }
  }

  componentWillUnmount() {
    this.props.resetCollection();
  }

  onSideMenuToggleHandler = () => {
    this.setState({ isSideMenuOpen: !this.state.isSideMenuOpen });
  };

  render() {
    const { isLoading } = this.props;
    return (
      <div className="collection-page">
        <CollectionPageMenu isSideMenu={false} />
        <CollectionPageSideMenu
          isSideMenuOpen={this.state.isSideMenuOpen}
          onToggle={this.onSideMenuToggleHandler}
        />
        <button
          className="collection-page__side-menu-toggle"
          onClick={this.onSideMenuToggleHandler}
        >
          <SideMeNuIcon />
        </button>
        <div
          className="collection-page__right"
          style={isLoading ? { height: '50rem' } : null}
        >
          {isLoading ? (
            <Spinner />
          ) : (
            <React.Fragment>
              <h3 className="collection-page__right__header">Men</h3>
              <Pagination />
              <CollectionPageGallery />
              <Pagination />
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.collections.isLoading
});

export default withRouter(
  connect(mapStateToProps, {
    fetchCollectionStartAsync,
    fetchFiltersStartAsync,
    resetCollection
  })(CollectionPage)
);
