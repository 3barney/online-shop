import delay from './delay';

let usersArray = [];

class LoginApi {

  static login(credentials){
    return new Promise( (resolve, reject) => {
      setTimeout( () => {
        // Simulate server-side validation
        const minEmailLength = 2;
        if(credentials.email.length < minEmailLength) {
          reject(`Email must be at least ${minEmailLength} characters.`);
        }
        usersArray.push(credentials);
        resolve(Object.assign({}, credentials));
      }, delay);
    });
  }
}

export default LoginApi;
