import * as _ from 'lodash';
import delay from './delay';

let registererArray = [];

const generateToken = (userData) => {
  return _.toLower(userData.firstName) + _.toLower(userData.secondName) ;
};

class RegisterApi {

  static register(userData) {
    return new Promise( (resolve, reject) => {
      setTimeout( () => {
        // Simulate Server side validation
        let firstName = userData.firstName;
        let secondName = userData.secondName;
        let phoneNumber = userData.phoneNumber;
        let email = userData.email;
        let password = userData.password;

        if(_.isNil(firstName) || _.isNil(secondName) || _.isNil(email) || _.isNil(password)) {
          reject(`The fields cannot be empty`);
        }
        let token = generateToken(userData);
        userData.token = token;
        registererArray.push(userData);
        resolve(Object.assign({}, userData));
      }, delay);
    });
  }
}

export default RegisterApi;
