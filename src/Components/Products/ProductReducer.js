import * as types from '../../actions/actionTypes';
import initialState from '../../reducers/initialState';

export default function productsReducer(state = initialState.products, action) {
  switch (action.type) {
    case types.LOAD_PRODUCTS_SUCCESS:
      return action.products;

    case types.CREATE_PRODUCT_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.products)
      ];

    case types.UPDATE_PRODUCT_SUCCESS:
      return [
        ...state.filter(products => products._id !== action.products._id),
        Object.assign({}, action.products)
      ];

    default:
      return state;
  }
}
