// APPLICATION routes
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './Components/App';
import HomePage from './Components/Home/HomePage';
import LoginPage from './Components/Authentication/LoginPage';
import RegisterPage from './Components/Authentication/RegisterPage';

export default (
  <Route path="/" component={App}>
    // load App component and then Nest other components and pass them as children
    <IndexRoute component={HomePage} />
    <Route path="login" component={LoginPage}/>
    <Route path="register" component={RegisterPage} />
  </Route>
);

/*

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import CoursesPage from './components/course/CoursesPage';
import ManageCoursePage from './components/course/ManageCoursePage';

export default (
  // Always load App component and then Nest other components and pass them as children
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="courses" component={CoursesPage} />
    <Route path="course" component={ManageCoursePage} />
    <Route path="course/:id" component={ManageCoursePage} />
    <Route path="about" component={AboutPage} />
  </Route>
);
*/
