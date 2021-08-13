import './SideMenus.scss';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { ReactComponent as Left } from '../../assets/icons/SVG/one-finger-swipe-left.svg';
import { connect } from 'react-redux';
import { fetchSubCategoriesStartAsync } from '../../redux/categories/categories.actions';
import { selectCategoriesAndRedirect } from '../../redux/Collection/collections.actions';
import SideMenuList from './SideMenuList/SideMenuList';
import { toggleSideMenu } from '../../redux/ui/ui.actions';
import SideMenuSubMenu from './SideMenuSubMenu/SideMenuSubMenu';

export class SideMenu extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    onMenuBarClick: PropTypes.func,
    fetchSubCategoriesStartAsync: PropTypes.func,
    categoriesList: PropTypes.array,
    level: PropTypes.number,
    selectCategoriesAndRedirect: PropTypes.func,
  };

  constructor() {
    super();
    this.state = {
      left: '-25%',
    };
  }

  componentDidMount() {
    if (window.matchMedia('(max-width:1200px)').matches) {
      this.setState({ left: '-40%' });
    }
    if (window.matchMedia('(max-width:900px)').matches) {
      this.setState({ left: '-50%' });
    }

    if (window.matchMedia('(max-width:600px)').matches) {
      this.setState({ left: '-100%' });
    }
  }

  render() {
    const {
      isOpen,
      onMenuBarClick,
      categoriesList,
      fetchSubCategoriesStartAsync,
      level,
    } = this.props;
    return (
      <div
        className="side-menu"
        style={{ left: isOpen ? '0%' : this.state.left }}
      >
        <h2 className="side-menu__header">
          Categories
          <Left className="side-menu__header__icon" onClick={onMenuBarClick} />
        </h2>
        <div className="side-menu__container">
          <SideMenuSubMenu />
          <SideMenuList
            categoriesList={categoriesList}
            level={level}
            fetchSubCategoriesStartAsync={fetchSubCategoriesStartAsync}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categoriesList: state.categories.categoriesList,
  level: state.categories.level,
  isOpen: state.ui.isSideMenuOpen,
});

export default withRouter(
  connect(mapStateToProps, {
    fetchSubCategoriesStartAsync,
    selectCategoriesAndRedirect,
    onMenuBarClick: toggleSideMenu,
  })(SideMenu)
);
