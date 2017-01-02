export default {
  userSessionCredentials: !!window.localStorage.shopID_token
  //userSessionCredentials: window && window.localStorage ? window.localStorage.getItem('shopID_token') : null
};


// window.localStorage.getItem('id_token') will return null if key not found
// token: window && window.localStorage ? window.localStorage.getItem('id_token') : null,
