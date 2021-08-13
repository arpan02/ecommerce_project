import UI_TYPES from './ui.types';

export const toggleSideMenu = () => (dispatch) => {
  dispatch({
    type: UI_TYPES.TOGGLE_SIDE_MENU
  });
};

export const setSideMenuSubItem = (itemNumber) => (dispatch) => {
  dispatch({
    type: UI_TYPES.SET_SIDE_MENU_SUB_ITEM,
    payload: itemNumber
  });
};
