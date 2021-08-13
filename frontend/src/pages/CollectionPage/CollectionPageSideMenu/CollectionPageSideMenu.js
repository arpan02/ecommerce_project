import SelectList from '../../../components/SelectList/SelectList';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { ReactComponent as ToggleLeftIcon } from '../../../assets/icons/SVG/one-finger-swipe-left.svg';
import './CollectionPageSideMenu.scss';

class CollectionPageSideMenu extends Component {
  static propTypes = {
    categories: PropTypes.array,
    ratings: PropTypes.array,
    brands: PropTypes.array,
    range: PropTypes.array
  };

  render() {
    const { brands, range, isSideMenuOpen, onToggle } = this.props;
    return (
      <div
        className={`collection-page__side-menu`}
        style={isSideMenuOpen ? { left: '0%' } : { left: '-50%' }}
      >
        <button
          onClick={onToggle}
          className="collection-page__side-menu__toggle"
        >
          <ToggleLeftIcon className="collection-page__side-menu__toggle__icon" />
        </button>

        <div className="collection-page__side-menu__container">
          <SelectList header="Price range" list={range} radio />
          {brands && brands.length > 0 ? (
            <SelectList header="Brands" list={brands} />
          ) : brands ? (
            <div className="collection-page__side-menu__no-brands">
              <h2> Brands </h2>
              <div>No Brands Found</div>
            </div>
          ) : null}
        </div>

        {/* <SelectList header="Rating" list={ratings} /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  brands: state.collections.filter ? state.collections.filter.brands : null,
  ratings: state.collections.filter ? state.collections.filter.ratings : null,
  filterOptions: state.collections.filterOptions,
  range: state.collections.filter ? state.collections.filter.range : null
});
export default withRouter(connect(mapStateToProps)(CollectionPageSideMenu));
