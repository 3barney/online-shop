import React, {PropTypes} from 'react';
import {browserHistory} from 'react-router';
import {Segment, Form, Button, Input} from "semantic-ui-react";

class LoginPage extends React.Component {
  constructor (props, context) {
    super(props, context);

    this.redirectToRegister = this.redirectToRegister.bind(this);
  }

  redirectToRegister() {
    browserHistory.push("/register");
  }

  render() {
    return (
      <div className="centerForm">
        <Segment raised textAlign="center" size="big" className="very padded text container">
          <Form>
            <h1>Welcome</h1>
            <Form.Field>
              <label>Email Address</label>
              <Input icon="mail" iconPosition="left" placeholder="Email"/>
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <Input icon="lock" iconPosition="left" type="password" placeholder="Password"/>
            </Form.Field>

            <Button basic
              color="blue"
              size="big"
              type="button">
              Login
            </Button>
            <Button basic
              color="teal"
              size="big"
              type="button"
              onClick={this.redirectToRegister}>
              Register
            </Button>
          </Form>
        </Segment>
      </div>
    );
  }
}

export default LoginPage;
