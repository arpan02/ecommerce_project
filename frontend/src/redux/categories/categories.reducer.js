import returnReducer from './categories.reducer.utils';
import CATEGORIES_TYPES from './categories.types';

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

const categoriesReducer = returnReducer(CATEGORIES_TYPES, INITIAL_STATE);

export default categoriesReducer;
