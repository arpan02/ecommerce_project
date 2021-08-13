import React from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as ArrowLeft } from '../../../assets/icons/SVG/chevron-thin-left.svg';
import { connect } from 'react-redux';
import uniqueId from 'uniqid';
import { fetchCollectionStartAsync } from '../../../redux/Collection/collections.actions';
import { withRouter } from 'react-router-dom';

const PaginationLeft = ({
  startPages,
  fetchCollectionStartAsync,
  currentPage,
  ...props
}) => {
  const onLeftClickHandler = () => {
    const { slug } = props.match.params;
    if (currentPage === 1) {
      return;
    }
    fetchCollectionStartAsync(slug, currentPage - 1);
  };
  // console.log(startPages);
  return (
    <React.Fragment>
      <button onClick={onLeftClickHandler} className="pagination__arrow">
        <ArrowLeft className="pagination__arrow__icon" />
      </button>
      {startPages.map((ele) => (
        <button className={`pagination__button ${
            currentPage === ele ? 'pagination__button--selected' : ''
          }`}
          key={uniqueId()}
          onClick={() =>
            fetchCollectionStartAsync(props.match.params.slug, ele)
          }
        >
          {ele}
        </button>
      ))}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  startPages: state.collections.startPages,
  currentPage: state.collections.currentPage
});

PaginationLeft.propTypes = {
  startPages: PropTypes.array,
  currentPage: PropTypes.number,
  params: PropTypes.object,
  fetchCollectionStartAsync: PropTypes.func,
  match: PropTypes.object
};

export default withRouter(
  connect(mapStateToProps, { fetchCollectionStartAsync })(PaginationLeft)
);
