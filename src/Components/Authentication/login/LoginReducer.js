import * as types from '../../../actions/actionTypes';
import initialState from '../../../reducers/initialState';

export default function loginReducer(state = initialState.userSessionCredentials, action) {
  switch(action.type) {
    case types.LOG_IN_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.user)
      ];
    
    default:
      return state;
  }
}
