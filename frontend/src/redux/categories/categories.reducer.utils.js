import { deepCopyArray } from '../../utils/copy';

const returnReducer = (TYPE, INITIAL_STATE) => {
  const categoriesReducer = (state = INITIAL_STATE, action) => {
    const cate = [...state.allCategories];
    cate.push(action.payload);

    const all = [...state.allCategories];
    all.pop();

    let slug;
    switch (action.type) {
      case TYPE.FETCH_PARENT_CATEGORIES_START:
        return {
          ...state,
          isFetching: true
        };
      case TYPE.FETCH_PARENT_CATEGORIES_SUCCESS:
        return {
          ...state,
          isFetching: false,
          categoriesList: action.payload,
          parentCategory: action.payload,
          allCategories: cate
        };

      case TYPE.FETCH_SUB_CATEGORIES_SUCCESS:
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

      case TYPE.FETCH_PARENT_CATEGORIES_FAILURE:
        return {
          ...state,
          isFetching: false,
          errorMessage: action.payload
        };

      case TYPE.FETCH_SEARCH_LIST:
        return {
          ...state,
          searchList: action.payload
        };

      case TYPE.FETCH_PREV_LIST:
        return {
          ...state,
          categoriesList: action.payload,
          level: state.level - 1,
          allCategories: all
        };

      case TYPE.PUSH_CATEGORIES_SLUG:
        slug = deepCopyArray(state.slug);
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

      case TYPE.POP_CATEGORIES_SLUG:
        slug = deepCopyArray(state.slug);

        slug.pop();
        if (state.level === 1) {
          slug.pop();
        }
        return {
          ...state,
          slug
        };

      case TYPE.RESET_CATEGORIES_LIST:
        return {
          ...state,
          categoriesList: action.payload.categoriesList,
          allCategories: action.payload.allCategories,
          level: 0,
          slug: []
        };

      default:
        return state;
    }
  };

  return categoriesReducer;
};
export default returnReducer;
