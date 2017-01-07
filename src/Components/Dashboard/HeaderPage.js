import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {Menu, Segment, Icon, Button} from 'semantic-ui-react';
import * as _ from 'lodash';
import toastr from 'toastr';
import * as LoginActions from '../Authentication/login/LoginActions';

class HeaderPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loggedUSerData: Object.assign({}, props.logged_user),
      errors: {},
      loggingOut: false
    };
    this.logoutUser = this.logoutUser.bind(this);
  }

  logoutUser(event) {
    event.preventDefault();
    this.setState({loggingOut: true});
    const logout = this.props.actions.logoutUser();
    if(logout === true) {
      this.redirectToLogin();
    } else {
      toastr.error(logout);
      this.setState({loggingOut: false});
    }
  }


  redirectToLogin(){
    this.setState({loggingOut: false});
    toastr.success('Logout Successfull');
    browserHistory.push("/login");
  }


  render() {
    if (!_.isNil(this.state.loggedUSerData)){
      return (
          <Menu pointing fixed="top" secondary size="huge" color="blue" inverted>
              <Menu.Item name="shop-logo">
                <Icon name="new pied piper" size="large" inverted />
                PIED PIPER ONLINE SHOP
              </Menu.Item>
              <Menu.Menu position="right">
                <Menu.Item name="logged-user">
                  <Icon name="user" size="large" inverted />
                  {this.state.loggedUSerData.email}
                </Menu.Item>
                <Menu.Item name="logout" color="red" onClick={this.logoutUser} >
                  <Button negative loading={this.state.loggingOut}>
                    <Icon name="lock"/>
                    Logout
                  </Button>
                </Menu.Item>
              </Menu.Menu>
          </Menu>
      );
    } else {
      return (
        <div>No user data</div>
      );
    }
  }
}

HeaderPage.propTypes = {
  logged_user: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(LoginActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(HeaderPage);
