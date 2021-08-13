import React from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as ArrowRight } from '../../../assets/icons/SVG/chevron-thin-right.svg';
import { connect } from 'react-redux';
import uniqueId from 'uniqid';
import { fetchCollectionStartAsync } from '../../../redux/Collection/collections.actions';
import { withRouter } from 'react-router-dom';

const PaginationRight = ({
  endPages,
  fetchCollectionStartAsync,
  currentPage,
  totalPages,
  ...props
}) => {
  const onRightClickHandler = () => {
    if (currentPage === null) {
      return;
    }
    const { slug } = props.match.params;
    console.log(slug, totalPages, currentPage);
    if (currentPage === totalPages) {
      return;
    }
    fetchCollectionStartAsync(slug, currentPage + 1);
  };
  return (
    <React.Fragment>
      {endPages.map((ele) => (
        <button className={`pagination__button ${
            currentPage === ele ? 'pagination__button--selected' : ''
          }`}
          onClick={() =>
            fetchCollectionStartAsync(props.match.params.slug, ele)
          }
          key={uniqueId()}
        >
          {ele}
        </button>
      ))}
      <button className="pagination__arrow" onClick={onRightClickHandler}>
        <ArrowRight className="pagination__arrow__icon" />
      </button>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  endPages: state.collections.endPages,
  currentPage: state.collections.currentPage,
  totalPages: state.collections.totalPages
});

PaginationRight.propTypes = {
  endPages: PropTypes.array,
  currentPage: PropTypes.number,
  match: PropTypes.object,
  fetchCollectionStartAsync: PropTypes.func,
  totalPages: PropTypes.number
};

export default withRouter(
  connect(mapStateToProps, { fetchCollectionStartAsync })(PaginationRight)
);
