import * as types from '../../actions/actionTypes';
import CategoryApi from '../../api/mockCategoriesApi';

export function loadCategoriesSuccess(categories) {
  return { type: types.LOAD_CATEGORIES_SUCCESS, categories};
}

export function createCategorySuccess(categories) {
  return { type: types.CREATE_CATEGORY_SUCCESS, categories};
}

export function updateCategorySuccess(category) {
  // TODO: yet to be implemented plus DELETE option
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
        dispatch(createCategorySuccess(cat));
      })
      .catch( error => {
        throw error;
      });
  };
}



/*
export function saveCourse(course) {
  return function(dispatch, getState){
    dispatch(beginAjaxCall());
    return courseApi.saveCourse(course)
      .then(course => {
        // if id exists, we update a course that already has an ID
        course.id ? dispatch(updateCourseSuccess(course)) : dispatch(createCourseSuccess(course));
      })
      .catch(error => {
        throw(error);
      });
  };
}
*/
