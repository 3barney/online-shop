/*eslint-disable no-console*/

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Segment, Form, Button, Input} from "semantic-ui-react";
import HeaderPage from './HeaderPage';

class DashboardPage extends React.Component {
  constructor(props, context){
    super(props, context);

    this.state = {
      userCreds: {}
    };
  }

  componentDidMount(){
    // TODO: change how user data is passed to state instead of router
    // <HeaderPage logged_user={this.props.logged_user} /> ADD KWA SEGMENT
    console.log("in mount");
    console.log(this.state);
    console.log(this.props.location.state.user_info);
  }
  render() {

    return (
      <div className="centerForm">

        <Segment raised textAlign="center" size="big" className="very padded text container">
          <h1>My DashBoard </h1>
        </Segment>
      </div>
    );
  }
}

export default DashboardPage;
