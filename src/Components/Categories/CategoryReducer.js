import * as types from '../../actions/actionTypes';
import initialState from '../../reducers/initialState';

export default function categoryReducer(state = initialState.categories, action) {
  switch (action.type) {
    case types.LOAD_CATEGORIES_SUCCESS:
      return action.categories;

    case types.CREATE_CATEGORY_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.categories)
      ];

      case types.UPDATE_CATEGORY_SUCCESS:
        return [
          ...state.filter(categories => categories.id !== action.categories.id),
        Object.assign({}, action.course)
        ];

    default:
      return state;
  }
}
