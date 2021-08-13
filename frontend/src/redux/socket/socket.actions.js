import { SOCKET_TYPES } from './socket.type';
import CATEGORIES_TYPES from '../categories/categories.types';

export const connectSocket = socket => dispatch => {
  // socketEventHandler(socket, dispatch);
  return dispatch({ type: SOCKET_TYPES.CONNECT_SOCKET, payload: socket });
};

export const socketEventHandler = (socket, dispatch) => {
  socket.on('searchData', async data => {
    console.log(data);
    dispatch({
      type: CATEGORIES_TYPES,
      payload: data
    });
  });
};
