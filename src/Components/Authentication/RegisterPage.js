import React, {PropTypes} from 'react';
import {Segment, Form, Button, Input} from "semantic-ui-react";

class RegisterPage extends React.Component {
  constructor(props){
    super(props);
    this.onRegister = this.onRegister.bind(this);
  }

  render() {
    return (
      <div className="centerForm">
        <Segment raised textAlign="center" size="big" className="very padded text container">
          <Form>
            <h1>User Registration</h1>
            <Form.Field>
              <label>First Name</label>
              <Input placeholder="First name"/>
            </Form.Field>
            <Form.Field>
              <label>Second Name</label>
              <Input placeholder="First name"/>
            </Form.Field>
            <Form.Field>
              <label>email</label>
              <Input type="email" placeholder="email"/>
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <Input type="password" placeholder="password"/>
            </Form.Field>
            <Form.Field>
              <label>Confirm Password</label>
              <Input type="password" placeholder="confirm password"/>
            </Form.Field>

            <Button primary
              color="teal"
              size="big"
              type="button"
              onClick={this.onRegister}>
              Register
            </Button>
          </Form>
        </Segment>
      </div>
    );
  }
}

export default RegisterPage;
