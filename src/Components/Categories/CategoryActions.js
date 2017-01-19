import axios from 'axios';
import qs from 'qs';
import * as configFile from "../../config/config";
import * as types from '../../actions/actionTypes';

export function loadCategoriesSuccess(categories) {
  return { type: types.LOAD_CATEGORIES_SUCCESS, categories};
}

export function createCategorySuccess(categories) {
  return { type: types.CREATE_CATEGORY_SUCCESS, categories};
}

export function updateCategorySuccess(categories) {
  return { type: types.UPDATE_CATEGORY_SUCCESS, categories};
}

export function loadCategories() {
  return function(dispatch) {
    return axios.get(`${configFile.BASE_API_URL}/category`, {
      headers: {'Authorization': 'Bearer '+ window.localStorage.getItem('shopID_token')}
    })
      .then( categories => {
        dispatch(loadCategoriesSuccess(categories.data));
      })
      .catch( error => {
        throw((error.response.data));
      });
  };
}

export function saveCategory(category) {
  return function(dispatch) {
    return axios.post(`${configFile.BASE_API_URL}/category`, qs.stringify(category), {
        headers: {'Authorization': 'Bearer '+ window.localStorage.getItem('shopID_token')}
    })
    .then( cat =>{
      dispatch(createCategorySuccess(cat));
    })
    .catch( error => {
      throw(error);
    });
  };
}

export function editCategory(category) {
  return function(dispatch) {
    return axios.put(`${configFile.BASE_API_URL}/category/${category._id}`, qs.stringify(category), {
      headers: {'Authorization': 'Bearer '+ window.localStorage.getItem('shopID_token')}
    })
    .then( category => {
      dispatch(updateCategorySuccess(category.data));
    })
    .catch( error => {
      throw(error);
    });
  };
}

/*
return function(dispatch) {
  return CategoryApi.saveCategory(category)
    .then( cat => {
      // if id exists, we update a category that already has an ID
      cat.id ? dispatch(updateCategorySuccess(cat)) : dispatch(createCategorySuccess(cat));
    })
    .catch( error => {
      throw error;
    });
};


return function(dispatch) {
  return axios.post(`${configFile.BASE_API_URL}/user/login`, qs.stringify(credentials))
    .then( loggedUser => {
      window.localStorage.setItem('shopID_token', loggedUser.data.token);
      dispatch(loginSuccess(loggedUser.data.userData));
    })
    .catch( error => {
      throw((error.response.data));
    });
};

*/
