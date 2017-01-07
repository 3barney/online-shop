import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import {Segment, Form, Button, Input, Label} from "semantic-ui-react";
import toastr from 'toastr';
import * as _ from 'lodash';
import * as LoginActions from './LoginActions';

// TODO: if token exists on localStorage and login is success change it to current logged user Token
export class LoginPage extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.state = {
      credentials: {credentials : {email: '', password: ''}},
      errors: {},
      loggingIn: false
    };

    this.onChange = this.onChange.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.loginFormIsValid = this.loginFormIsValid.bind(this);
  }

  onChange(event) {
    const field = event.target.name;
    const credentials = this.state.credentials;
    credentials[field] = event.target.value;
    return this.setState({credentials: credentials});
  }

  onLogin(event) {

    event.preventDefault();
    if(!this.loginFormIsValid()){
      return ;
    }

    this.setState({loggingIn: true});
    this.props.actions.loginUser(this.state.credentials)
      .then( ()=> {
        this.redirectToDashboard();
      })
      .catch( (error) => {
        toastr.error(error);
        this.setState({loggingIn: false});
        this.setState({isUserLoggedIn: false});
      });
  }

  loginFormIsValid() {
    let formIsValid = true;
    let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let errors = {};

    if(_.isNil(this.state.credentials.email) || this.state.credentials.email.length < 5) {
      errors.email = 'Not a Valid email Address!';
      formIsValid = false;
    } else if(!regex.test(this.state.credentials.email)) { // ret false
      errors.email = 'Incorrect email Address';
      formIsValid = false;
    }

    if(_.isNil(this.state.credentials.password) || this.state.credentials.password.length < 5) {
      errors.password = 'Password to short';
      formIsValid = false;
    }

    this.setState({errors: errors});
    return formIsValid;
  }

  redirectToDashboard(){
    this.setState({loggingIn: false});
    toastr.success('Login Successfull');
    window.localStorage.setItem('loggedInUser', this.state.credentials.email);
    browserHistory.push("/dashboard")
    //browserHistory.push({pathname: '/dashboard', state: {user_info: this.state.credentials}});
  }

  redirectToRegister() {
    browserHistory.push("/register");
  }


  render() {
    return (
      <div className="centerForm">
        <Segment raised textAlign="center" size="big" className="very padded text container">
          <Form loading={this.state.loggingIn}>
            <h1>Welcome</h1>

            <Form.Field>
              <label>Email Address</label>
              <Input icon="mail" iconPosition="left" required
                name="email"
                type="email"
                placeholder="Email"
                input={this.state.credentials.email}
                onChange={this.onChange} />
              {this.state.errors.email && <Label pointing color="red">{this.state.errors.email}</Label>}
            </Form.Field>

            <Form.Field>
              <label>Password</label>
              <div className="ui left icon input">
                <input  required name="password" type="password" placeholder="Password"
                  input={this.state.credentials.password}
                  onChange={this.onChange} />
                <i className="lock icon"></i>
              </div>
              {this.state.errors.password && <Label pointing color="red">{this.state.errors.password}</Label>}
            </Form.Field>

            <Button basic color="blue" size="big" type="button"
              name="login"
              onClick={this.onLogin}
              disabled={this.state.loggingIn}
              content={this.state.loggingIn ? 'logging in...': 'Login'} />

            <Button basic color="teal" size="big" type="button"
              name="register"
              content="Register"
              onClick={this.redirectToRegister} />

          </Form>
        </Segment>
      </div>
    );
  }
}

LoginPage.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(LoginActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(LoginPage);
