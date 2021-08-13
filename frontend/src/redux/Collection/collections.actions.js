import COLLECTION_TYPES from './collection.types';
import store from '../store';

import axios from 'axios';
import { deepCopyObject } from '../../utils/copy';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const fetchCollectionStart = () => ({
  type: COLLECTION_TYPES.FETCH_COLLECTION_START
});

const fetchCollectionFailure = (errorMessage) => ({
  type: COLLECTION_TYPES.FETCH_COLLECTION_FAILURE,
  payload: errorMessage
});

/**
 * function to fetch product from side menu
 * @param {slug of product} slug
 */
export const fetchCollectionStartAsync = (slug, page = 1) => async (
  dispatch
) => {
  try {
    dispatch(fetchCollectionStart());
    let { brands, priceRange } = store.getState().collections.filterOptions;
    brands = JSON.stringify(brands);

    const collection = await axios.get(
      `/product?slug=${slug}&page=${page}&limit=10&brands=${brands}&priceRange=${JSON.stringify(
        priceRange
      )}`
    );

    let { count } = collection.data;
    let limit = 10;
    let totalPages = Math.ceil(count / limit);
    let startPages, endPages;
    if (totalPages > 5) {
      if (totalPages === page) {
        startPages = [1];
        endPages = [page - 3, page - 2, page - 1, page];
      } else if (totalPages - page <= 3) {
        startPages = [1];
        endPages = [totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      } else {
        startPages = [page, page + 1, page + 2, page + 3];
        endPages = [totalPages];
      }
    } else {
      startPages = [];
      for (let i = 1; i <= totalPages; i++) {
        startPages.push(i);
      }
      endPages = [];
    }
    dispatch({
      type: COLLECTION_TYPES.FETCH_COLLECTION_SUCCESS,
      payload: {
        collection: collection.data.products,
        count: collection.data.count,
        startPages,
        endPages,
        currentPage: page,
        totalPages
      }
    });
  } catch (error) {
    toast.error('Something went wrong in fetching products! Try again later');
    dispatch(fetchCollectionFailure(error.message));
  }
};

export const selectCategoriesAndRedirect = (categoryId) => async (dispatch) => {
  dispatch({
    type: COLLECTION_TYPES.SELECT_CATEGORY,
    payload: categoryId
  });
};

export const fetchFiltersStartAsync = (slug) => async (dispatch) => {
  try {
    const result = await axios.get(`/product/get-filters?slug=${slug}`);

    let range = [];
    let { maxPrice } = result.data;
    let rangeNumber = maxPrice / 5;
    let smallerNumber = 0;
    let i = 1;
    let min = 0;
    let max = 0;
    while (i < 6) {
      min = parseInt(smallerNumber);
      max = parseInt(i * rangeNumber);
      const obj = {
        min,
        max,
        type: 'range'
      };
      range.push(obj);
      smallerNumber = i * rangeNumber;
      i++;
    }

    const rangeObj = {
      type: 'range',
      value: 'none',
      min: 0,
      max: maxPrice
    };
    range.unshift(rangeObj);

    let brands = [];
    let ratings = [
      {
        name: '4 or more',
        value: 4,
        type: 'rating'
      },

      {
        name: '3 or more',
        value: 3,
        type: 'rating'
      },

      {
        name: '2 or more',
        value: 2,
        type: 'rating'
      },

      {
        name: '1 or more',
        value: 1,
        type: 'rating'
      }
    ];

    if (result.data.brands) {
      for (let b of result.data.brands) {
        let obj = b;
        obj.type = 'brand';
        obj.isChecked = 'false';
        brands.push(obj);
      }
    }

    const payload = {
      brands,
      ratings,
      range,
      rangeDefault: true,
      rangeDefaultCount: 1
    };

    dispatch({
      type: COLLECTION_TYPES.FETCH_FILTER_COLLECTION_SUCCESS,
      payload
    });
  } catch (error) {
    toast.error('Something went wrong in fetching filter! Try again later');
  }
};

export const filterProducts = (event, element, slug, page = 1) => async (
  dispatch
) => {
  try {
    const state = store.getState().collections.filterOptions;
    let newOptions = deepCopyObject(state);

    //
    if (slug !== newOptions.slug) {
      newOptions.slug = slug;
      newOptions.brands = [];
    }

    if (event.target.checked) {
      if (element.type === 'brand') {
        newOptions.brands.push(element._id);
      }

      if (element.type === 'range') {
        newOptions.priceRange = element;
      }
    } else {
      newOptions.brands.splice(newOptions.brands.indexOf(element._id), 1);
    }

    dispatch({
      type: COLLECTION_TYPES.UPDATE_FILTER_OPTIONS,
      payload: newOptions
    });

    let brands = JSON.stringify(newOptions.brands);

    const collection = await axios.get(
      `/product?slug=${slug}&page=${page}&limit=10&brands=${brands}&priceRange=${JSON.stringify(
        newOptions.priceRange
      )}`
    );

    let { count } = collection.data;
    let limit = 10;
    let totalPages = Math.ceil(count / limit);

    let startPages, endPages;
    if (totalPages > 5) {
      if (totalPages === page) {
        //
        startPages = [1];
        endPages = [page - 3, page - 2, page - 1, page];
      } else if (totalPages - page <= 3) {
        startPages = [1];
        endPages = [totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      } else {
        startPages = [page, page + 1, page + 2, page + 3];
        endPages = [totalPages];
      }
    } else {
      startPages = [];
      for (let i = 1; i <= totalPages; i++) {
        startPages.push(i);
      }
      endPages = [];
    }
    dispatch({
      type: COLLECTION_TYPES.FETCH_COLLECTION_SUCCESS,
      payload: {
        collection: collection.data.products,
        count: collection.data.count,
        startPages,
        endPages,
        currentPage: page,
        totalPages
      }
    });
  } catch (error) {
    toast.error('Something went wrong!Try again later');
  }
};

export const resetCollection = () => (dispatch) => {
  dispatch({ type: COLLECTION_TYPES.RESET_COLLECTION });
};
