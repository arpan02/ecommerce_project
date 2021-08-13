import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './root-reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
// import { logger } from 'redux-logger';

const middlewares = [thunk];

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
