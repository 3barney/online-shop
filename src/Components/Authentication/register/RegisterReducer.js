import * as types from '../../../actions/actionTypes';
import initialState from '../../../reducers/initialState';

// TODO: check how it affects current state
export default function registerReducer(state = initialState.userSessionCredentials, action) {
  switch(action.type) {
    case types.REGISTER_USER_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.registeredUser)
      ];
    default:
      return state;
  }
}
