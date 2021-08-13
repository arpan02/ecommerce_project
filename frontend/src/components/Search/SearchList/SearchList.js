import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './SearchList.scss';

const SearchList = ({ searchList, isHidden, onsearchItemClick }) => {
  return (
    <div className="search-list"
      style={{ display: isHidden ? 'none' : 'flex' }}
    >
      {searchList
        ? searchList.map(ele => (
            <Link className="search-list__item"
              to={`/collection/${ele.slug}`}
              key={Math.random()}
              onClick={onsearchItemClick}
            >
              {ele.name}
            </Link>
          ))
        : null}
    </div>
  );
};

SearchList.propTypes = {
  searchList: PropTypes.array,
  isHidden: PropTypes.bool,
  onsearchItemClick: PropTypes.func
};

export default SearchList;
