import * as types from '../../actions/actionTypes';
import CategoryApi from '../../api/mockCategoriesApi';

export function loadCategoriesSuccess(categories) {
  return { type: types.LOAD_CATEGORIES_SUCCESS, categories};
}

export function createCategorySuccess(category) {
  return { type: types.CREATE_CATEGORY_SUCCESS, category};
}

export function updateCategorySuccess() {
  // TODO: yet to be implemented plus DELETE option
}

export function loadCategories() {
    // TODO: handle sending of ajax status request heree
    return CategoryApi.getAllCategories()
      .then(categories => {
        return(loadCategoriesSuccess(categories));
      })
      .catch( error => {
        throw error;
      });
}
