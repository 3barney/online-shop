/*eslint-disable no-console*/

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Container, Segment, Grid} from "semantic-ui-react";
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
    this.setState({loggedInUser: this.props.location.state.user_info});
  }

  componentDidMount(){
    // TODO: change how user data is passed to state instead of router
    console.log("in mount");
    console.log(this.props.location.state.user_info);
  }
  render() {
    return (
      <div className=".dashboardSize">
        <HeaderPage logged_user={this.props.location.state.user_info} />
        <div>
          <SideBar logged_user={this.props.location.state.user_info} />
        </div>
      </div>
    );
  }
}

DashboardPage.propTypes = {
  location: PropTypes.object.isRequired
};

export default DashboardPage;
