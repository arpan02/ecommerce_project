import UI_TYPES from './ui.types';

const INITIAL_STATE = {
  isSideMenuOpen: false,
  sideMenuItemNumber: 1
};

const uiReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UI_TYPES.TOGGLE_SIDE_MENU:
      return {
        ...state,
        isSideMenuOpen: !state.isSideMenuOpen
      };

    case UI_TYPES.SET_SIDE_MENU_SUB_ITEM:
      return {
        ...state,
        sideMenuItemNumber: action.payload
      };

    default:
      return state;
  }
};

export default uiReducer;
