import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './Components/App';
import Authentication from './Components/Authentication/Authenticator';
import HomePage from './Components/Home/HomePage';
import LoginPage from './Components/Authentication/login/LoginPage'; //eslint-disable-line import/no-named-as-default
import RegisterPage from './Components/Authentication/register/RegisterPage'; //eslint-disable-line import/no-named-as-default
import DashboardPage from './Components/Dashboard/DashboardPage';
import CategoryPage from './Components/Categories/CategoryPage';
import DashboardDetailsPage from './Components/Dashboard/DashboardDetailsPage';

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
