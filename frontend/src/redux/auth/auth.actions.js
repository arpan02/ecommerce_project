import axios from 'axios';
import { setAuthUser, logOut } from './auth.utils';
import { AUTH_TYPES } from './auth.types';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

export const signUpUser = (data) => async (dispatch) => {
  try {
    dispatch({ type: AUTH_TYPES.AUTH_START });

    const result = await axios.post('/auth/register', data);

    setAuthUser(result.data.data.token, dispatch, result.data.data);

    toast.success('Created account successfully');
  } catch (error) {
    if (error.response.data.errors) {
      dispatch({
        type: AUTH_TYPES.SET_AUTH_REGISTER_ERROR,
        payload: error.response.data.errors,
      });
    } else {
      toast.error('Something Went wrong try again later');
    }
  }
};

export const singInUser = (data) => async (dispatch) => {
  try {
    dispatch({ type: AUTH_TYPES.AUTH_START });

    const result = await axios.post('/auth/login', data);

    setAuthUser(result.data.data.token, dispatch, result.data.data);
  } catch (error) {
    if (error.response.status === 400 || error.response.status === 401) {
      console.log(error.response);
      dispatch({
        type: AUTH_TYPES.SET_AUTH_LOGIN_ERROR,
        payload: error.response.data.message,
      });
    } else {
      toast.error('Something Went wrong try again later');
    }
  }
};

export const logOutUser = () => (dispatch) => {
  logOut(dispatch);
};

export const fetchUserData = () => async (dispatch) => {
  try {
    const result = await axios.get('/user');

    dispatch({
      type: AUTH_TYPES.FETCH_USER_DATA,
      payload: result.data.user,
    });
  } catch (error) {
    toast.error('Something is wrong');
  }
};

export const updateUserInfo = (data) => async (dispatch) => {
  try {
    const result = await axios.patch('/user/update-user', data);
    dispatch({
      type: AUTH_TYPES.FETCH_USER_DATA,
      payload: result.data.user,
    });
    toast.success('User Info updated successfully');
  } catch (error) {
    toast.error('Something Went wrong!try again later');
  }
};

export const updatePassword = (data) => async (dispatch) => {
  try {
    const result = await axios.patch('/auth/update-password', data);
    setAuthUser(result.data.data.token, dispatch, result.data.data);
    toast.success('Password Changed Successfully');
  } catch (error) {
    if (error.response.status === 401) {
      toast.error('Current Password is wrong');
      return;
    }
    toast.error('Something Went wrong!try again later');
  }
};
