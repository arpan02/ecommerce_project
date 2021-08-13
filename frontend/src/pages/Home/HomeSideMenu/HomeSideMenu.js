import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './HomeSideMenu.scss';
import uniqueId from 'uniqid';
import { ReactComponent as Icon } from '../../../assets/icons/SVG/menu.svg';
import { withRouter } from 'react-router-dom';
import HOME_CATEGORIES_TYPES from '../../../redux/categories/homeCategories.types';
import {
  fetchSubCategoriesStartAsync,
  pushSlug,
  popSlug,
  fetchParentCategoriesFromChildAsync,
  resetCategoriesList,
} from '../../../redux/categories/categories.actions';
import { ReactComponent as LeftArrow } from '../../../assets/icons/SVG/arrow-left.svg';

class HomeSideMenu extends Component {
  static propTypes = {
    categoriesList: PropTypes.array,
    history: PropTypes.object,
    fetchSubCategoriesStartAsync: PropTypes.func,
    level: PropTypes.number,
    fetchParentCategoriesFromChildAsync: PropTypes.func,
    pushSlug: PropTypes.func,
    popSlug: PropTypes.func,
    slugList: PropTypes.array,
    allCategories: PropTypes.array,
  };

  onItemClick = (ele) => {
    console.log(this.props);
    this.props.history.push(`/collection/${ele.slug}`);
  };

  onClickHandler = (event, el) => {
    this.props.pushSlug(el.slug, HOME_CATEGORIES_TYPES.PUSH_CATEGORIES_SLUG);
    event.preventDefault();
    if (this.props.level !== 2) {
      this.props.fetchSubCategoriesStartAsync(
        el,
        this.props.history,
        HOME_CATEGORIES_TYPES.FETCH_SUB_CATEGORIES_SUCCESS
      );
    }
  };

  onLeftArrowClick = () => {
    this.props.popSlug(HOME_CATEGORIES_TYPES.POP_CATEGORIES_SLUG);
    this.props.fetchParentCategoriesFromChildAsync(
      HOME_CATEGORIES_TYPES.FETCH_PREV_LIST,
      this.props.allCategories
    );
  };

  componentDidUpdate(prevProps) {
    if (prevProps.slugList !== this.props.slugList) {
      let { slugList } = this.props;
      let slug = '';
      if (this.props.level === 2) {
        for (let i = 0; i < slugList.length; i++) {
          slug = slug + slugList[i] + '/';
        }
        this.props.history.push(`/collection/${slug}`);
      }
    }
  }
  componentWillUnmount() {
    this.props.resetCategoriesList(HOME_CATEGORIES_TYPES.RESET_CATEGORIES_LIST);
  }

  render() {
    const { categoriesList } = this.props;
    return (
      <div className="home-side-menu">
        <div className="home-side-menu__header">
          {this.props.level === 0 ? (
            <Icon className="home-side-menu__header__icon" />
          ) : (
            <LeftArrow
              style={{ cursor: 'pointer' }}
              onClick={this.onLeftArrowClick}
              className="home-side-menu__header__icon"
            />
          )}
          <span>categories</span>
        </div>
        <div className="home-side-menu__container">
          {categoriesList.map((ele) => (
            <div
              key={uniqueId()}
              className="home-side-menu__item"
              onClick={(event) => this.onClickHandler(event, ele)}
            >
              {ele.name}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categoriesList: state.homeCategories.categoriesList,
  level: state.homeCategories.level,
  allCategories: state.homeCategories.allCategories,
  slugList: state.homeCategories.slug,
});

export default withRouter(
  connect(mapStateToProps, {
    fetchSubCategoriesStartAsync,
    pushSlug,
    popSlug,
    fetchParentCategoriesFromChildAsync,
    resetCategoriesList,
  })(HomeSideMenu)
);
