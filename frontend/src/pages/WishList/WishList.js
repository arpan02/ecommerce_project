import './WishList.scss';
import uniqueId from 'uniqid';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getWishList } from '../../redux/wish-list/wish-list.actions';
import PropTypes from 'prop-types';
import WishListItem from './WishListItem/WishListItem';
import Spinner from '../../components/Spinner/Spinner';
import { setSideMenuSubItem } from '../../redux/ui/ui.actions';
import NotAuth from '../../components/NotAuth/NotAuth';

export class WishList extends Component {
  static propTypes = {
    getWishList: PropTypes.func,
    list: PropTypes.array,
    isLoading: PropTypes.bool
  };

  componentDidMount() {
    const { getWishList } = this.props;
    getWishList();
    this.props.setSideMenuSubItem(2);
  }

  render() {
    const { list, isLoading, isAuth } = this.props;
    if (isAuth) {
      return (
        <div className="wish-list">
          <h1>Wish List</h1>
          <div
            className="wish-list__container"
            style={isLoading ? { height: '50rem' } : null}
          >
            {isLoading ? (
              <Spinner />
            ) : list.length > 0 ? (
              list.map((ele) => (
                <WishListItem
                  _id={ele._id}
                  image={ele.image[0]}
                  key={uniqueId()}
                  price={ele.discounted_price}
                  name={ele.name}
                />
              ))
            ) : (
              <div className="wish-list__not-found">
                NO Items found ! Add products to wish list to see items
              </div>
            )}
          </div>
        </div>
      );
    } else {
      return <NotAuth page="Wish List" />;
    }
  }
}

const mapStateToProps = (state) => ({
  list: state.wishList.list,
  isLoading: state.wishList.isLoading,
  isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, { getWishList, setSideMenuSubItem })(
  WishList
);
