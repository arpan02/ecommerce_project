import React from 'react';
import PropTypes from 'prop-types';
import './Pagination.scss';

import PaginationLeft from './PaginationLeft/PaginationLeft';
import PaginationRight from './PaginationRight/PaginationRight';
import { connect } from 'react-redux';

const Pagination = ({ endPages }) => {
  return (
    <div className="pagination">
      {/* <span className="pagination__info">showing 1-9 of 40 items</span> */}
      <div className="pagination__container">
        <div className="pagination__container__content">
          <PaginationLeft />
          {endPages ? (
            endPages.length > 0 ? (
              <span className="pagination__dot">...</span>
            ) : null
          ) : null}
          <PaginationRight />
        </div>
      </div>
      {/* <div className="pagination__show-all">show all</div> */}
    </div>
  );
};

Pagination.propTypes = {
  endPages: PropTypes.array
};

const mapStateToProps = (state) => ({
  endPages: state.collections.endPages
});

export default connect(mapStateToProps)(Pagination);
