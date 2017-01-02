// Entry point for Our App
// Shows login page

import React from "react";
import {browserHistory} from 'react-router';
import {Container, Segment, Button} from "semantic-ui-react";

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.redirectToRegister = this.redirectToRegister.bind(this);
    this.redirectToLogin = this.redirectToLogin.bind(this);
  }

  redirectToLogin() {
    browserHistory.push("/login");
  }

  redirectToRegister() {
    browserHistory.push("/register");
  }

  render () {
    return (
      <div>
        <Container fluid className="centerForm">
          <Segment raised textAlign="center" size="big" className="very padded text container">
            <h1 className="ui header">Shop Online Administration</h1>
            <p>Hold Local Page info</p>
            <Button basic
              color="teal"
              size="big"
              type="button"
              onClick={this.redirectToRegister}>
              Register
            </Button>
            <Button basic
              color="blue"
              size="big"
              type="button"
              onClick={this.redirectToLogin} >
              Login
            </Button>
          </Segment>
        </Container>
      </div>
    );
  }
}

export default HomePage;
