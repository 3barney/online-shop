/*eslint-disable no-console*/

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
      loggedInUser: {}
    };
  }

  componentWillMount(){
    if(_.isNull(this.props.location.state)) {
      browserHistory.push("/login");
      return ;
    } else {
      this.setState({loggedInUser: this.props.location.state.user_info}); // eslint-disable-line react/no-did-mount-set-state
    }
  }

  componentDidMount(){

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

export default DashboardPage;
