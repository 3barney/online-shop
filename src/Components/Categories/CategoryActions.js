import * as types from '../../actions/actionTypes';
import CategoryApi from '../../api/mockCategoriesApi';

export function loadCategoriesSuccess(categories) {
  return { type: types.LOAD_CATEGORIES_SUCCESS, categories};
}

export function createCategorySuccess(categories) {
  return { type: types.CREATE_CATEGORY_SUCCESS, categories};
}

export function updateCategorySuccess(category) {
  return { type: types.UPDATE_CATEGORY_SUCCESS, category};
}

export function loadCategories() {
  return function(dispatch) {
    return CategoryApi.getAllCategories()
      .then(categories => {
        dispatch(loadCategoriesSuccess(categories));
      })
      .catch( error => {
        throw error;
      });
  };
}

export function saveCategory(category) {
  return function(dispatch) {
    return CategoryApi.saveCategory(category)
      .then( cat => {
        dispatch(createCategorySuccess  (cat));
        // TODO: Make this work
        // if id exists, we update a category that already has an ID
        //cat.id ? dispatch(updateCategorySuccess(cat)) : dispatch(createCategorySuccess(cat));
      })
      .catch( error => {
        throw error;
      });
  };
}
