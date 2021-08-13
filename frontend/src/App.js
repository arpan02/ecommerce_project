import './App.scss';
import { Route, Switch, Redirect } from 'react-router-dom';
import Menu from './components/Menu/Menu';
import Footer from './components/Footer/Footer';
import openSocket from 'socket.io-client';
import jwt from 'jsonwebtoken';
import React, { Component, lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { fetchParentCategoriesStartAsync } from './redux/categories/categories.actions';
import { connect } from 'react-redux';
import { connectSocket } from './redux/socket/socket.actions';
import Auth from './pages/Auth/Auth';
import reduxStore from './redux/store';
import { AUTH_TYPES } from './redux/auth/auth.types';
import { fetchCartAsync } from './redux/cart/cart.actions';
import { fetchUserData } from './redux/auth/auth.actions';
import Loading from './components/Loading/Loading';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import SideMenu from './components/SideMenu/SideMenu';
import CATEGORIES_TYPES from './redux/categories/categories.types';
import HOME_CATEGORIES_TYPES from './redux/categories/homeCategories.types';
import CheckOut from './pages/CheckOut/CheckOut';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';

const HomePage = lazy(() => import('./pages/Home/Home'));
const CollectionPage = lazy(() =>
  import('./pages/CollectionPage/CollectionPage')
);
const CartPage = lazy(() => import('./pages/CartPage/CartPage'));
const WishListPage = lazy(() => import('./pages/WishList/WishList'));
const ProfilePage = lazy(() => import('./pages/ProfilePage/ProfilePage'));
const CheckOutPage = lazy(() => import('./pages/CheckOut/CheckOut'));
const ResetPasswordPage = lazy(() =>
  import('./pages/ResetPassword/ResetPassword')
);
const ForgotPasswordPage = lazy(() =>
  import('./pages/ForgotPassword/ForgotPassword')
);

export class App extends Component {
  static propTypes = {
    fetchParentCategoriesStartAsync: PropTypes.func,
    connectSocket: PropTypes.func,
    token: PropTypes.string,
    isAuth: PropTypes.bool,
    fetchUserData: PropTypes.func,
    fetchCartAsync: PropTypes.func,
  };

  async componentDidMount() {
    const { fetchParentCategoriesStartAsync, fetchUserData } = this.props;
    const socket = openSocket('https://ecommercedemo22.herokuapp.com');
    this.props.connectSocket(socket);
    const decoded = jwt.decode(localStorage.getItem('jwt_token'));
    const date = new Date().getTime();
    if (decoded) {
      if (date >= decoded.exp * 1000) {
        reduxStore.dispatch({
          type: AUTH_TYPES.LOG_OUT_USER,
        });
      } else {
        this.props.fetchCartAsync();
        fetchUserData();
      }
    }
    fetchParentCategoriesStartAsync(
      CATEGORIES_TYPES.FETCH_PARENT_CATEGORIES_START,
      CATEGORIES_TYPES.FETCH_PARENT_CATEGORIES_SUCCESS,
      CATEGORIES_TYPES.FETCH_PARENT_CATEGORIES_FAILURE
    );
    fetchParentCategoriesStartAsync(
      HOME_CATEGORIES_TYPES.FETCH_PARENT_CATEGORIES_START,
      HOME_CATEGORIES_TYPES.FETCH_PARENT_CATEGORIES_SUCCESS,
      HOME_CATEGORIES_TYPES.FETCH_PARENT_CATEGORIES_FAILURE
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.isAuth === !prevProps.isAuth && this.props.isAuth) {
      this.props.fetchCartAsync();
    }
  }

  render() {
    // console.log(this.props.isAuth);
    return (
      <div className="App">
        <Menu />
        <SideMenu />
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route
                exact
                path="/collection/:slug+"
                component={CollectionPage}
              />

              <Route exact path="/" component={HomePage} />

              <Route exact path="/cart" component={CartPage} />
              <Route
                exact
                path="/auth"
                render={() => {
                  return this.props.isAuth ? <Redirect to="/" /> : <Auth />;
                }}
              />
              <Route exact component={ProfilePage} path="/profile" />
              <Route exact path="/wish-list" component={WishListPage} />
              <Route exact path="/check-out" component={CheckOutPage} />
              <Route
                exact
                path="/forgot-password"
                component={ForgotPasswordPage}
              />
              <Route
                exact
                path="/reset-password/:token"
                component={ResetPasswordPage}
              />
            </Switch>
          </Suspense>
        </ErrorBoundary>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, {
  fetchParentCategoriesStartAsync,
  connectSocket,
  fetchCartAsync,
  fetchUserData,
})(App);
