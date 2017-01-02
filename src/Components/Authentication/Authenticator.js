class Authentication {
  static loggedIn() {
    return !!window.localStorage.shopID_token;
  }

  static logOut() {
    window.localStorage.removeItem('shopID_token');
  }
}

export default Authentication;
