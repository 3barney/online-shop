/*eslint-disable no-console*/
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import {Segment, Form, Button, Input} from "semantic-ui-react";
import toastr from 'toastr';
import * as _ from 'lodash';
import * as LoginActions from './LoginActions';

class LoginPage extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.state = {
      // TODO: change this back to object from Array
      credentials: {credentials : {email: '', password: ''}},
      errors: {},
      loggingIn: false
    };

    this.redirectToRegister = this.redirectToRegister.bind(this);
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
      .then( (user)=>
        this.redirectToDashboard(user)
      )
      .catch( (error) => {
        toastr.error(error);
        this.setState({loggingIn: false});
      });
  }

  loginFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if(_.isNull(this.state.credentials.email.length) || this.state.credentials.email.length < 5) {
      errors.email = 'Email must be at least 5 characters';
      formIsValid = false;
    }

    this.setState({errors: errors});
    return formIsValid;
  }


  redirectToDashboard(user){
    console.log(`user info ${user}`);
    this.setState({loggingIn: false});
    toastr.success('Login Successfull');
    browserHistory.push('/dashboard');
    // this.context.router.push('/dashboard'); // After save redirect to /dashboard
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
              <Input icon="mail" iconPosition="left"
                name="email"
                type="email"
                content={this.state.errors}
                placeholder="Email"
                input={this.state.credentials.email}
                onChange={this.onChange} />
            </Form.Field>

            <Form.Field>
              <label>Password</label>
              <Input icon="lock" iconPosition="left"
                name="password"
                type="password" placeholder="Password"
                input={this.state.credentials.password}
                onChange={this.onChange} />
            </Form.Field>

            <Button basic color="blue" size="big" type="button"
              onClick={this.onLogin}
              disabled={this.state.loggingIn}
              content={this.state.loggingIn ? 'logging in...': 'Login'} />

            <Button basic color="teal" size="big" type="button"
              onClick={this.redirectToRegister} >
              Register
            </Button>
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
