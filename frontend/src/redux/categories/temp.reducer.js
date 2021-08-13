import CATEGORIES_TYPES from './categories.types';
import { deepCopyArray } from '../../utils/copy';

const INITIAL_STATE = {
  categoriesList: [],
  isFetching: false,
  errorMessage: null,
  level: 0,
  selectedCategory: [null],
  parentCategory: null,
  searchList: null,
  prevCategory: 'parent',
  allCategories: [],
  slug: [],
  allHomeCategories: [],
  homeCategoriesList: [],
  homeLevel: 0,
  homeSlug: []
};

const categoriesReducer = (state = INITIAL_STATE, action) => {
  const cate = [...state.allCategories];
  cate.push(action.payload);

  const all = [...state.allCategories];
  all.pop();

  let slug;
  switch (action.type) {
    case CATEGORIES_TYPES.FETCH_PARENT_CATEGORIES_START:
      return {
        ...state,
        isFetching: true
      };
    case CATEGORIES_TYPES.FETCH_PARENT_CATEGORIES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        categoriesList: action.payload,
        parentCategory: action.payload,
        allCategories: cate,
        homeCategoriesList: action.payload
      };

    case CATEGORIES_TYPES.FETCH_SUB_CATEGORIES_SUCCESS:
      console.log(action);
      if (state.level === 2) {
        return {
          ...state
        };
      }
      return {
        ...state,
        categoriesList: action.payload,
        isFetching: false,
        level: state.level + 1,
        allCategories: cate
      };

    case CATEGORIES_TYPES.FETCH_PARENT_CATEGORIES_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload
      };

    case CATEGORIES_TYPES.FETCH_SEARCH_LIST:
      return {
        ...state,
        searchList: action.payload
      };

    case CATEGORIES_TYPES.FETCH_PREV_LIST:
      return {
        ...state,
        categoriesList: action.payload,
        level: state.level - 1,
        allCategories: all
      };

    case CATEGORIES_TYPES.PUSH_CATEGORIES_SLUG:
      slug = deepCopyArray(state.slug);
      console.log(action.payload);
      if (slug.length >= 3) {
        slug.pop();
      }
      if (slug.indexOf(action.payload) === -1) {
        slug.push(action.payload);
      }
      return {
        ...state,
        slug
      };

    case CATEGORIES_TYPES.POP_CATEGORIES_SLUG:
      slug = deepCopyArray(state.slug);

      slug.pop();
      if (state.level === 1) {
        slug.pop();
      }
      return {
        ...state,
        slug
      };

    default:
      return state;
  }
};

export default categoriesReducer;
