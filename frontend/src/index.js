import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import axios from 'axios';
import store from './redux/store';

const baseURL = `https://ecommercedemo22.herokuapp.com/api/v1/`;
axios.defaults.baseURL = baseURL;

// console.log('base url--->', baseURL);

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// axios.interceptors.response.use(
//   (response) => response,
//   (error) => {

//     throw error;
//   }
// );

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
