import React, { Component } from 'react';
import './CartPage.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CartPageItem from './CartPageItem/CartPageItem';
import CartPageMenu from './CartPageMenu/CartPageMenu';
import Spinner from '../../components/Spinner/Spinner';
import { setSideMenuSubItem } from '../../redux/ui/ui.actions';
import NotAuth from '../../components/NotAuth/NotAuth';
import { Link } from 'react-router-dom';

class CartPage extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    setSideMenuSubItem: PropTypes.func,
    isAuth: PropTypes.bool,
    cartList: PropTypes.array,
    totalPrice: PropTypes.number
  };

  componentDidMount() {
    this.props.setSideMenuSubItem(5);
  }
  render() {
    const { isLoading, isAuth, cartList, totalPrice } = this.props;
    const toLink = {
      pathname: '/check-out',
      cartList: cartList,
      totalPrice: totalPrice
    };
    if (isAuth) {
      return (
        <div className="cart-page">
          <h2 className="cart-page__header">Cart</h2>
          {isLoading ? (
            <Spinner />
          ) : cartList && cartList.length > 0 ? (
            <div className="cart-page__container">
              <CartPageMenu />
              <CartPageItem />
              <Link to={toLink}>buy now</Link>
            </div>
          ) : (
            <div className="cart-page__not-found">
              NO Items found ! Add products to Cart to see items
            </div>
          )}
        </div>
      );
    } else {
      return <NotAuth page="Cart" />;
    }
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.cart.isLoading,
  isAuth: state.auth.isAuth,
  cartList: state.cart.cartList,
  totalPrice: state.cart.total
});

export default connect(mapStateToProps, { setSideMenuSubItem })(CartPage);
