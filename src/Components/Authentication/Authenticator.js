class Authentication {
  static loggedIn() {
    return !!window.localStorage.token;
  }

  static logOut() {
    window.localStorage.removeItem('token');
  }
}

export default Authentication;
