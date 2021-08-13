import './SelectList.scss';
import { ReactComponent as CheckMark } from '../../assets/icons/SVG/checkmark.svg';
import PropTypes from 'prop-types';
import uniqueId from 'uniqid';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterProducts } from '../../redux/Collection/collections.actions';
import { withRouter } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

class SelectList extends Component {
  static propTypes = {
    header: PropTypes.string,
    list: PropTypes.array,
    onChangeHandler: PropTypes.func,
    match: PropTypes.object,
    radio: PropTypes.bool,
  };

  render() {
    const { header, list, onChangeHandler, match, radio } = this.props;
    const { slug } = match.params;
    return (
      <div className="select-list">
        <h1 className="select-list__header">{header}</h1>
        {list ? (
          list.map((ele) => {
            const id = uniqueId();
            return (
              <div className="select-list__item" key={uniqueId()}>
                <input
                  type={radio ? 'radio' : 'checkbox'}
                  className="select-list__item__checkbox"
                  id={id}
                  name={radio ? 'price-range' : null}
                  onChange={(event) => onChangeHandler(event, ele, slug)}
                />
                <label htmlFor={id} className="select-list__item__label">
                  <span className="select-list__item__label__box">
                    <CheckMark className="select-list__item__label__box__icon" />
                  </span>
                  {ele.name ? ele.name : ele._id}
                  {ele.type === 'range'
                    ? ele.value !== 'none'
                      ? `${ele.min}-${ele.max}`
                      : 'None'
                    : null}
                </label>
              </div>
            );
          })
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}

export default withRouter(
  connect(null, { onChangeHandler: filterProducts })(SelectList)
);
