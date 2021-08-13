import { combineReducers } from 'redux';
import categoriesReducer from './categories/categories.reducer';
import collectionsReducer from './Collection/collection.reducer';
import authReducer from './auth/auth.reducer';
import socketReducer from './socket/socket.reducer';
import cartReducer from './cart/cart.reducer';
import wishListReducer from './wish-list/wish-list.reducer';
import uiReducer from './ui/ui.reducer';
import homeCategoriesReducer from './categories/home.categories.reducer';

const rootReducer = combineReducers({
  categories: categoriesReducer,
  collections: collectionsReducer,
  socket: socketReducer,
  auth: authReducer,
  cart: cartReducer,
  wishList: wishListReducer,
  ui: uiReducer,
  homeCategories: homeCategoriesReducer
});

export default rootReducer;
