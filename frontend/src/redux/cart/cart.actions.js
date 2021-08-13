import CART_TYPES from './cart.types';
import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

export const cartToggle = () => (dispatch) => {
  dispatch({
    type: CART_TYPES.TOGGLE_CART
  });
};

export const addToCart = (data) => async (dispatch) => {
  try {
    const result = await axios.post('/cart', { id: data._id });

    if (result.data.cart.nModified === 0) {
      toast.warn('Already Part of cart');
      return;
    }
    // Need discounted price here not retail price --> do later
    const payload = {
      image: data.image,
      name: data.name,
      discounted_price: data.discounted_price,
      quantity: 1
    };
    dispatch({
      type: CART_TYPES.Add_TO_CART,
      payload
    });
    toast.success('Added to cart Successfully');
  } catch (error) {
    toast.error('Something went wrong!! Try again later');
  }
};

export const fetchCartAsync = () => async (dispatch) => {
  try {
    dispatch({
      type: CART_TYPES.FETCH_CART_START,
      payload: true
    });

    const result = await axios.get('/cart');
    console.log(result);

    let payload;
    if (result.data.cart.length > 0) {
      payload = {
        cartList: result.data.cart[0].cartList,
        _id: result.data.cart[0]._id
      };
    } else {
      payload = {
        cartList: [],
        _id: null
      };
    }

    dispatch({
      type: CART_TYPES.FETCH_CART_SUCCESS,
      payload
    });
  } catch (error) {
    toast.error('Something went wrong in fetching cart! Try again later');
    dispatch({
      type: CART_TYPES.FETCH_CART_FAILURE,
      payload: false
    });
  }
};

export const toggleQuantity = (data) => async (dispatch) => {
  try {
    if (data.quantity === 1 && data.operation === 'decrement') {
      toast.warn("Can't decrease the quantity less than one");
      return;
    }
    // return;
    const result = await axios.get(
      `cart/toggle-quantity?cartItemId=${data.cartItemId}&productId=${data.productId}&quantity=${data.quantity}&operation=${data.operation}`
    );
    if (result.data.cart.nModified <= 0) {
      return;
    }

    if (data.operation === 'decrement') {
      dispatch({
        type: CART_TYPES.DECREMENT_QUANTITY,
        payload: data.index
      });
    } else if (data.operation === 'increment') {
      dispatch({
        type: CART_TYPES.INCREMENT_QUANTITY,
        payload: data.index
      });
    }
  } catch (error) {
    toast.error('Something went wrong!! Try again later');
  }
};

export const removeCartItem = (data) => async (dispatch) => {
  try {
    console.log(data);
    const result = await axios.delete(`/cart/?cartItemId=${data.cartItemId}`);

    if (result.data.result.nModified === 1) {
      dispatch({
        type: CART_TYPES.REMOVE_CART_ITEM,
        payload: data.index
      });
    }
    toast.success('Removed Cart Item successfully');
    //
  } catch (error) {
    toast.error(
      'Something went wrong!! Unable to remove cart Item, Try again later'
    );
  }
};

export const getCartTotal = (total) => (dispatch) => {
  dispatch({
    type: CART_TYPES.GET_CART_TOTAL,
    payload: total
  });
};
