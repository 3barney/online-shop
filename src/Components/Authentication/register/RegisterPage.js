/*eslint-disable no-console*/

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import toastr from 'toastr';
import * as _ from 'lodash';
import {Segment, Form, Button, Input, Label} from "semantic-ui-react";
import * as RegisterActions from './RegisterActions';

class RegisterPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userData: {userData : {firstName: '', secondName: '', phoneNumber: '', email: '', password: ''}},
      errors: {},
      registering: false
    };

    this.onChange = this.onChange.bind(this);
    this.onRegister = this.onRegister.bind(this);
  }

  componentDidMount() {
    localStorage.removeItem('token'); // Remove user Token
  }

  onChange(event) {
    const field = event.target.name;
    const userData = this.state.userData;
    userData[field] = event.target.value;
    return this.setState({userData: userData});
  }

  registerFormIsValid() {
    let registerFormIsValid = true;
    let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let errors = {};

    if(_.isNil(this.state.userData.firstName)) {
      errors.firstName = 'First Name is required!';
      registerFormIsValid = false;
    }
    if(_.isNil(this.state.userData.phoneNumber)) {
      errors.phoneNumber = 'Phone Number is required!';
      registerFormIsValid = false;
    }

    // email Validation
    if(_.isNil(this.state.userData.email) || this.state.userData.email.length < 5) {
      errors.email = 'Not a Valid email Address!';
      registerFormIsValid = false;
    } else if(!regex.test(this.state.userData.email)) { // ret false
      errors.email = 'Not a Valid email Address';
      registerFormIsValid = false;
    }

    // Password validation
    if(_.isNil(this.state.userData.password) || this.state.userData.password.length < 5) {
      errors.password = 'Password to short';
      registerFormIsValid = false;
    }

    // Password Comparison
    if(!_.isNil(this.state.userData.password) && !_.isNil(this.state.userData.confirmPassword)){
      if(this.state.userData.password === this.state.userData.confirmPassword){
        registerFormIsValid = true;
      } else {
        errors.confirmPassword = "Passwords do Not Match";
        registerFormIsValid = false;
      }
    }

    this.setState({errors: errors});
    return registerFormIsValid;
  }


  onRegister(event){
    event.preventDefault();

    if(!this.registerFormIsValid()){
      return ;
    }

    this.setState({registering: true});
    this.props.actions.registerUser(this.state.userData)
      .then( (registeredUser) => {
        this.redirectToDashboard(registeredUser);
      })
      .catch( (error) => {
        toastr.error(error);
        this.setState({registering: false});
      });
  }

  redirectToDashboard(user){
    console.log(`user info ${user}`);
    this.setState({registering: false});
    toastr.success('Registration Successfull');
    browserHistory.push('/dashboard');
    // this.context.router.push('/dashboard'); // After save redirect to /dashboard
  }

  render() {
    return (
      <div className="centerForm">
        <Segment raised textAlign="center" size="big" className="very padded text container">
          <Form loading={this.state.registering}>
            <h1>User Registration</h1>
            <Form.Field>
              <label>First Name</label>
              <Input name="firstName" type="text" placeholder="First name"
                input={this.state.userData.firstName}
                onChange={this.onChange} />
              {this.state.errors.firstName && <Label pointing color="red">{this.state.errors.firstName}</Label>}
            </Form.Field>

            <Form.Field>
              <label>Second Name</label>
              <Input name="secondName" type="text" placeholder="Second name"
                input={this.state.userData.secondName}
                onChange={this.onChange} />
            </Form.Field>

            <Form.Field>
              <label>Phone Number</label>
              <input name="phoneNumber" type="tel" placeholder="Phone Number"
                input={this.state.userData.phoneNumber}
                onChange={this.onChange} />
              {this.state.errors.phoneNumber && <Label pointing color="red">{this.state.errors.phoneNumber}</Label>}
            </Form.Field>

            <Form.Field>
              <label>Email</label>
              <Input name="email" type="email" placeholder="Email" required
                input={this.state.userData.email}
                onChange={this.onChange} />
              {this.state.errors.email && <Label pointing color="red">{this.state.errors.email}</Label>}
            </Form.Field>

            <Form.Field>
              <label>Password</label>
              <div>
                <input required name="password" type="password" placeholder="password"
                  input={this.state.userData.password}
                  onChange={this.onChange} />
              </div>
              {this.state.errors.password && <Label pointing color="red">{this.state.errors.password}</Label>}
            </Form.Field>

            <Form.Field>
              <label>Confirm Password</label>
              <div>
                <input required name="confirmPassword" type="password" placeholder="confirm password"
                  input={this.state.userData.confirmPassword}
                  onChange={this.onChange} />
              </div>
              {this.state.errors.confirmPassword && <Label pointing color="red">{this.state.errors.confirmPassword}</Label>}
            </Form.Field>

            <Button primary color="teal" size="big" type="button"
              onClick={this.onRegister}
              disabled={this.state.registering}
              content={this.state.registering ? 'Processing...': 'Register'} />
          </Form>
        </Segment>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(RegisterActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(RegisterPage);
