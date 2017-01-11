import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './Components/App';
import Authentication from './Components/Authentication/Authenticator';
import HomePage from './Components/Home/HomePage';
import LoginPage from './Components/Authentication/login/LoginPage'; //eslint-disable-line import/no-named-as-default
import RegisterPage from './Components/Authentication/register/RegisterPage'; //eslint-disable-line import/no-named-as-default
import DashboardPage from './Components/Dashboard/DashboardPage';//eslint-disable-line import/no-named-as-default
import DashboardDetailsPage from './Components/Dashboard/DashboardDetailsPage';
import CategoryPage from './Components/Categories/CategoryPage';
import ManageCategoryPage from './Components/Categories/ManageCategoryPage'; //eslint-disable-line import/no-named-as-default
import ProductPage from './Components/Products/ProductPage';
import ManageProductPage from './Components/Products/ManageProductPage';

export default (
  <Route path="/" component={App}>
    // load App component and then Nest other components and pass them as children
    <IndexRoute component={HomePage} />
    <Route path="register" component={RegisterPage} />
    <Route path="login" component={LoginPage}/>

    <Route onEnter={requireAuth}>
      <Route path="dashboard" component={DashboardPage} >
        <Route path="home" component={DashboardDetailsPage} />
        <Route path="categories" component={CategoryPage} />
        <Route path="categories/add" component={ManageCategoryPage} />
        <Route path="categories/add/:id" component={ManageCategoryPage} />
        <Route path="products" component={ProductPage} />
        <Route path="products/add" component={ManageProductPage} />
        <Route path="products/add/:id" component={ManageProductPage} />
      </Route>
    </Route>
  </Route>
);

function requireAuth(nextState, replace){
  if(!Authentication.loggedIn()) {
    replace({
      pathname: 'login',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}
