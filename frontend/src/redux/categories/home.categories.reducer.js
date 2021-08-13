import returnReducer from './categories.reducer.utils';
import HOME_CATEGORIES_TYPES from './homeCategories.types';
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
  slug: []
};

const homeCategoriesReducer = returnReducer(
  HOME_CATEGORIES_TYPES,
  INITIAL_STATE
);

export default homeCategoriesReducer;
