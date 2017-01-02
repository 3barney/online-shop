/*eslint-disable no-console*/

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Segment, Grid} from "semantic-ui-react";
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
      <div>
        <HeaderPage logged_user={this.props.location.state.user_info} />
        <Grid>
          <Grid.Column width={4}>
            <SideBar logged_user={this.props.location.state.user_info} />
          </Grid.Column>
          <Grid.Column width={12}>
            <Segment raised textAlign="center" size="big" className="very padded text container">
              <h1>My DashBoard </h1>
            </Segment>
          </Grid.Column>
        </Grid>
      
      </div>
    );
  }
}

DashboardPage.propTypes = {
  location: PropTypes.object.isRequired
};

export default DashboardPage;
