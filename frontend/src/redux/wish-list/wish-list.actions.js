import axios from 'axios';
import WISH_LIST_TYPES from './wish-list.types';

export const addToWishList = (productId) => async () => {
  try {
    console.log(productId);
    const result = await axios.post('/wish-list', { productId });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

export const getWishList = () => async (dispatch) => {
  try {
    dispatch({
      type: WISH_LIST_TYPES.FETCH_WISH_LIST_START,
      payload: true
    });

    const result = await axios.get('/wish-list');
    console.log(result);

    // return;
    // return;
    console.log(result.data.wishList.list);
    dispatch({
      type: WISH_LIST_TYPES.FETCH_WISH_LIST_SUCCESS,
      payload: result.data.wishList
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: WISH_LIST_TYPES.FETCH_WISH_LIST_FAILURE,
      payload: false
    });
  }
};
