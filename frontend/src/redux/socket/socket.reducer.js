import { SOCKET_TYPES } from './socket.type';

const INITIAL_STATE = {
  socket: null
};

const socketReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SOCKET_TYPES.CONNECT_SOCKET:
      return {
        ...state,
        socket: action.payload
      };

    case 'test':
      return state;

    default:
      return state;
  }
};

export default socketReducer;
