import COLLECTION_TYPES from './collection.types';
import { deepCopyObject } from '../../utils/copy';

const INITIAL_STATE = {
  collectionsList: null,
  errorMessage: null,
  isHomeCollectionLoading: false,
  currentCategory: null,
  homeCollection: null,
  currentPage: 1,
  totalPages: null,
  filter: null,
  isLoading: false,
  filterOptions: {
    brands: [],
    slug: '',
    priceRange: {}
  },
  count: 0,
  countPerPage: 10,
  startPages: [],
  endPages: []
};
const collectionsReducer = (state = INITIAL_STATE, action) => {
  let { filterOptions } = state;
  switch (action.type) {
    case COLLECTION_TYPES.FETCH_COLLECTION_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload
      };
    case COLLECTION_TYPES.FETCH_COLLECTION_START:
      return {
        ...state,
        isLoading: true
      };

    case COLLECTION_TYPES.FETCH_COLLECTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        collectionsList: action.payload.collection,
        count: action.payload.count,
        startPages: action.payload.startPages,
        endPages: action.payload.endPages,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages
      };
    case COLLECTION_TYPES.SELECT_CATEGORY:
      return {
        ...state,
        currentCategory: action.payload
      };

    case COLLECTION_TYPES.FETCH_HOME_COLLECTION_SUCCESS:
      return {
        ...state,
        homeCollection: action.payload,
        isHomeCollectionLoading: false
      };

    case COLLECTION_TYPES.FETCH_HOME_COLLECTION_FAILURE:
    case COLLECTION_TYPES.FETCH_HOME_COLLECTION_START:
      return {
        ...state,
        isHomeCollectionLoading: action.payload
      };

    case COLLECTION_TYPES.FETCH_FILTER_COLLECTION_SUCCESS:
      filterOptions = deepCopyObject(filterOptions);
      filterOptions.priceRange = action.payload.range[0];
      return {
        ...state,
        filter: action.payload,
        filterOptions
      };

    case COLLECTION_TYPES.UPDATE_FILTER_OPTIONS:
      return {
        ...state,
        filterOptions: action.payload
      };

    case COLLECTION_TYPES.RESET_COLLECTION:
      return INITIAL_STATE;

    default:
      return state;
  }
};

export default collectionsReducer;
