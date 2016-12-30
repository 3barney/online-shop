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

  onChange(event) {
    const field = event.target.name;
    const userData = this.state.userData;
    userData[field] = event.target.value;
    return this.setState({userData: userData});
  }

  onRegister(event){
    event.preventDefault();

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
            </Form.Field>

            <Form.Field>
              <label>Email</label>
              <Input name="email" type="email" placeholder="email"
                input={this.state.userData.email}
                onChange={this.onChange} />
            </Form.Field>

            <Form.Field>
              <label>Password</label>
              <Input name="password" type="password" placeholder="password"
                required
                input={this.state.userData.password}
                onChange={this.onChange} />
            </Form.Field>

            <Form.Field>
              <label>Confirm Password</label>
              <Input name="confirmPassword" type="password" placeholder="confirm password"
                required
                input={this.state.userData.password}
                onChange={this.onChange} />
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
