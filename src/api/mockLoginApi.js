import delay from './delay';
import * as _ from 'lodash';

let usersArray = [];

const generateToken = (credentials) => {
  return  `token. ${_.toLower(credentials.email)}.untoken`;
};

class LoginApi {

  static login(credentials){
    return new Promise( (resolve, reject) => {
      setTimeout( () => {
        // Simulate server-side validation
        const minEmailLength = 2;
        if(credentials.email.length < minEmailLength) {
          reject(`Email must be at least ${minEmailLength} characters.`);
        }
        let token = generateToken(credentials);
        credentials.token = token;
        usersArray.push(credentials);
        resolve(Object.assign({}, credentials));
      }, delay);
    });
  }
}

export default LoginApi;
