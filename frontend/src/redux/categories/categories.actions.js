import axios from 'axios';
import store from '../store';
import { toast } from 'react-toastify';

export const fetchParentCategoriesStartAsync = (
  TYPE_START,
  TYPE_SUCCESS,
  TYPE_FAILURE
) => async (dispatch) => {
  try {
    dispatch({
      type: TYPE_START
    });
    const parentCategories = await axios.get(
      '/categories/get-parent-categories'
    );

    const data = parentCategories.data.categories;
    data.shift();

    dispatch({
      type: TYPE_SUCCESS,
      payload: data
    });
  } catch (error) {
    toast.error('Something went wrong in fetching Categories');
  }
};

export const fetchParentCategoriesFromChildAsync = (
  TYPE,
  allCategories
) => async (dispatch) => {
  try {
    let level;
    if (TYPE === 'FETCH_PREV_LIST') {
      // eslint-disable-next-line prefer-destructuring
      level = store.getState().categories.level;
    } else {
      // eslint-disable-next-line prefer-destructuring
      level = store.getState().homeCategories.level;
    }
    if (level === 0) {
      return;
    }

    dispatch({
      type: TYPE,
      payload: [...allCategories[level - 1]]
    });
  } catch (error) {
    toast.error('Something went wrong in fetching Categories');
  }
};

export const fetchSubCategoriesStartAsync = (data, history, TYPE) => async (
  dispatch
) => {
  try {
    const parentCategories = await axios.get(
      `categories/get-sub-categories/${data._id}`
    );
    if (parentCategories.data.subCategories.length > 0) {
      const { subCategories } = parentCategories.data;

      dispatch({
        type: TYPE,
        payload: subCategories
      });
    } else {
      let slugList;
      if (TYPE === 'FETCH_SUB_CATEGORIES_SUCCESS') {
        slugList = store.getState().categories.slug;
      } else {
        slugList = store.getState().homeCategories.slug;
      }
      let slug = '';
      for (let i of slugList) {
        slug += i + '/';
      }
      history.push(`/collection/${slug}`);
    }
  } catch (error) {
    toast.error('Something went wrong in fetching Categories');
  }
};

export const fetchSearchCategories = (socket, data, TYPES) => async (
  dispatch
) => {
  socket.emit('search', data);
  socket.on('searchData', (data) => {
    dispatch({
      type: TYPES.FETCH_SEARCH_LIST,
      payload: data
    });
  });
};

export const pushSlug = (slug, TYPE) => async (dispatch) => {
  dispatch({
    type: TYPE,
    payload: slug
  });
};

export const popSlug = (TYPE) => async (dispatch) => {
  dispatch({
    type: TYPE
  });
};

export const resetCategoriesList = (TYPE) => async (dispatch) => {
  let list;

  if (TYPE === 'HOME_RESET_CATEGORIES_LIST') {
    list = store.getState().homeCategories.allCategories[0];
  }
  dispatch({
    type: TYPE,
    payload: { categoriesList: [...list], allCategories: [[...list]] }
  });
};
