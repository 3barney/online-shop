import axios from 'axios';
import qs from 'qs';
import * as configFile from "../../config/config";
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
    return axios.get(`${configFile.BASE_API_URL}/product`, {
      headers: {'Authorization': 'Bearer '+ window.localStorage.getItem('shopID_token')}
    })
    .then( products => {
        dispatch(loadProductsSuccess(products.data));
    })
    .catch( error => {
      throw(error);
    });
  };
}

export function saveProduct(product) {
  return function(dispatch) {
    return axios.post(`${configFile.BASE_API_URL}/product`, qs.stringify(product), {
        headers: {'Authorization': 'Bearer '+ window.localStorage.getItem('shopID_token')}
    })
    .then( prod =>{
      dispatch(createProductSuccess(prod));
    })
    .catch( error => {
      throw(error);
    });
  };
}

export function editProduct(product) {
  return function(dispatch) {
    return axios.put(`${configFile.BASE_API_URL}/product/${product._id}`, qs.stringify(product), {
      headers: {'Authorization': 'Bearer '+ window.localStorage.getItem('shopID_token')}
    })
    .then( product => {
      dispatch(updateProductSuccess(product.data));
    })
    .catch( error => {
      throw(error);
    });
  };
}
/*

export function editCategory(category) {

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
*/
