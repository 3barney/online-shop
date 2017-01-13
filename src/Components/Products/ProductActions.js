import * as types from '../../actions/actionTypes';
import ProductApi from '../../api/mockProductsApi';

export function loadProductsSuccess(products) {
  return { type: types.LOAD_PRODUCTS_SUCCESS, products};
}

export function createProductSuccess(products) {
  return {type: types.CREATE_PRODUCT_SUCCESS, products};
}

export function updateProductSuccess(products) {
  return { type: types.UPDATE_PRODUCT_SUCCESS, products};
}

export function loadProducts() {
  return function (dispatch) {
    return ProductApi.getAllProducts()
      .then( products => {
        dispatch(loadProductsSuccess(products));
      })
      .catch( error => {
        throw(error);
      });
  };
}

export function saveProduct(product) {
  return function(dispatch) {
    return ProductApi.saveProduct(product)
      .then( prod => {
        // if id exists, we update a category that already has an ID
        prod.id ? dispatch(updateProductSuccess(prod)) : dispatch(createProductSuccess(prod));
      })
      .catch( error => {
        throw error;
      });
  };
}
