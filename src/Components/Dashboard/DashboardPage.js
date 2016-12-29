/*eslint-disable no-console*/

import React, {PropTypes} from 'react';
import {Segment, Form, Button, Input} from "semantic-ui-react";

class DashboardPage extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    const user = this.props;
    console.log(user);
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
