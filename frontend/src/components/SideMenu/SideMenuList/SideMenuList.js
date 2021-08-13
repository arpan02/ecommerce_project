import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as ArrowLeft } from '../../../assets/icons/SVG/arrow-left.svg';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  fetchParentCategoriesFromChildAsync,
  pushSlug,
  popSlug
} from '../../../redux/categories/categories.actions';
import CATEGORIES_TYPES from '../../../redux/categories/categories.types';

export class SideMenuList extends Component {
  static propTypes = {
    fetchSubCategoriesStartAsync: PropTypes.func,
    level: PropTypes.number,
    categoriesList: PropTypes.array,
    fetchParentCategoriesFromChildAsync: PropTypes.func,
    history: PropTypes.object,
    pushSlug: PropTypes.func,
    popSlug: PropTypes.func,
    slugList: PropTypes.array,
    allCategories: PropTypes.array
  };

  constructor() {
    super();
    this.state = {
      slug: '',
      isFirst: true
    };
  }

  onClickHandler = (event, el) => {
    this.props.pushSlug(el.slug, CATEGORIES_TYPES.PUSH_CATEGORIES_SLUG);
    event.preventDefault();
    if (this.props.level !== 2) {
      this.props.fetchSubCategoriesStartAsync(
        el,
        this.props.history,
        CATEGORIES_TYPES.FETCH_SUB_CATEGORIES_SUCCESS
      );
    }
  };

  onLeftArrowClick = () => {
    this.props.popSlug(CATEGORIES_TYPES.POP_CATEGORIES_SLUG);
    this.props.fetchParentCategoriesFromChildAsync(
      CATEGORIES_TYPES.FETCH_PREV_LIST,
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

  render() {
    const { categoriesList } = this.props;
    return (
      <div className="side-menu__list">
        <div className="side-menu__list__header">
          <ArrowLeft className="side-menu__list__header__icon"
            onClick={this.onLeftArrowClick}
          />
          <h3>Categories</h3>
        </div>
        {categoriesList
          ? categoriesList.map((el) => (
              <Link to={`/collection/${this.state.slug}`}
                className="side-menu__list__item"
                onClick={(event) => this.onClickHandler(event, el)}
                key={el._id}
              >
                {el.name}
              </Link>
            ))
          : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  slugList: state.categories.slug,
  allCategories: state.categories.allCategories
});

export default withRouter(
  connect(mapStateToProps, {
    fetchParentCategoriesFromChildAsync,
    pushSlug,
    popSlug
  })(SideMenuList)
);
