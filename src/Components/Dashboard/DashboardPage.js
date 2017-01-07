/*eslint-disable no-console*/
/*eslint-disable react/prop-types*/

import React, {PropTypes} from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {Container, Segment, Grid} from "semantic-ui-react";
import * as _ from 'lodash';
import HeaderPage from './HeaderPage';
import SideBar from './SideBar';

class DashboardPage extends React.Component {
  constructor(props, context){
    super(props, context);

    this.state = {
      loggedInUser: window.localStorage.loggedInUser
    };

  }

  render() {
    return (
      <div className=".dashboardSize">
        <HeaderPage logged_user={this.state.loggedInUser} />
        <div>
          <SideBar logged_user={this.state.loggedInUser} />
        </div>
      </div>
    );
  }
}

DashboardPage.propTypes = {
  location: PropTypes.object.isRequired
};

function mapStateToProps(state){
  return {
    loginReducer: state.loginReducer
  };
}

export default connect(mapStateToProps, null)(DashboardPage);
