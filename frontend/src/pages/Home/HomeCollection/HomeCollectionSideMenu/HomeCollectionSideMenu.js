import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../../../../components/Spinner/Spinner';

import { ReactComponent as ArrowRight } from '../../../../assets/icons/SVG/arrow-right.svg';
import uniqueId from 'uniqid';
const HomeCollectionSideMenu = ({ categoriesList, onClick, isLoading }) => {
  const List = categoriesList.map((ele) => (
    <div className="home-collection__side-menu__item"
      onClick={() => onClick(ele)}
      key={uniqueId()}
    >
      <ArrowRight className="home-collection__side-menu__item__icon" />
      <div className="home-collection__side-menu__item__name">{ele.name}</div>
    </div>
  ));

  return (
    <div className="home-collection__side-menu">
      {isLoading ? <Spinner /> : List}
    </div>
  );
};

HomeCollectionSideMenu.propTypes = {
  categoriesList: PropTypes.array,
  onClick: PropTypes.func,
  isLoading: PropTypes.bool
};

export default HomeCollectionSideMenu;
