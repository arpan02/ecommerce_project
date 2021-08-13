import WISH_LIST_TYPES from './wish-list.types';
import { AUTH_TYPES } from '../auth/auth.types';

const INITIAL_STATE = {
  list: [],
  _id: null,
  isLoading: false
};

const wishListReducer = (state = INITIAL_STATE, action) => {

  if(action.type===AUTH_TYPES.LOG_OUT_USER){
    return INITIAL_STATE;
  }

  switch (action.type) {
    case WISH_LIST_TYPES.FETCH_WISH_LIST_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        list: action.payload.wishListItems,
        _id: action.payload._id,
        isLoading: false
      };

    case WISH_LIST_TYPES.FETCH_WISH_LIST_FAILURE:
    case WISH_LIST_TYPES.FETCH_WISH_LIST_START:
      return {
        ...state,
        isLoading: action.payload
      };
    default:
      return state;
  }
};

export default wishListReducer;
