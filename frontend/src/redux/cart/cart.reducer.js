import CART_TYPES from './cart.types';
import { AUTH_TYPES } from '../auth/auth.types';

const INITIAL_STATE = {
  isCartOpen: false,
  cartList: [],
  _id: null,
  isSubCategoriesAvailable: true,
  total: 0,
  isLoading: false
};

const calculateTotal = (cartList) => {
  let sum = 0;
  for (let i = 0; i < cartList.length; i++) {
    sum = sum + cartList[i].quantity * cartList[i].discounted_price;
  }
  return sum;
};

const cartReducer = (state = INITIAL_STATE, action) => {
  const cartList = [...state.cartList];
  let total;

  if (action.type === AUTH_TYPES.LOG_OUT_USER) {
    return INITIAL_STATE;
  }

  switch (action.type) {
    case CART_TYPES.TOGGLE_CART:
      return {
        ...state,
        isCartOpen: !state.isCartOpen
      };

    case CART_TYPES.Add_TO_CART:
      cartList.push(action.payload);
      total = calculateTotal(cartList);
      return {
        ...state,
        cartList,
        total
      };

    case CART_TYPES.FETCH_CART_SUCCESS:
      total = calculateTotal(action.payload.cartList);
      return {
        ...state,
        cartList: action.payload.cartList,
        _id: action.payload._id,
        total,
        isLoading: false
      };

    case CART_TYPES.FETCH_CART_FAILURE:
    case CART_TYPES.FETCH_CART_START:
      return {
        ...state,
        isLoading: action.payload
      };

    case CART_TYPES.DECREMENT_QUANTITY:
      cartList[action.payload]['quantity'] =
        cartList[action.payload]['quantity'] - 1;
      total = calculateTotal(cartList);
      return {
        ...state,
        cartList,
        total
      };

    case CART_TYPES.INCREMENT_QUANTITY:
      cartList[action.payload]['quantity'] =
        cartList[action.payload]['quantity'] + 1;
      total = calculateTotal(cartList);
      return {
        ...state,
        cartList,
        total
      };

    case CART_TYPES.REMOVE_CART_ITEM:
      cartList.splice(action.payload, 1);
      total = calculateTotal(cartList);
      return {
        ...state,
        cartList,
        total
      };

    case CART_TYPES.GET_CART_TOTAL:
      return {
        ...state,
        total: action.payload
      };
    default:
      return state;
  }
};

export default cartReducer;
