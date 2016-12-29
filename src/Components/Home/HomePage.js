// Entry point for Our App
// Shows login page

import React from "react";
import {browserHistory} from 'react-router';
import {Segment, Button} from "semantic-ui-react";

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
      </div>
    );
  }
}

export default HomePage;

/*
import React from "react";
import {Link} from "react-router";

class HomePage extends React.Component
{
  render () {
    return (
      <div className="jumbotron">
        <h1>Barnabas Administration</h1>
        <p>React, Redux and React router in ES6 for responsive web Apps</p>
        <Link to="about" className="btn btn-primary btn-lg">Learn More</Link>
      </div>
    );
  }
}

export default HomePage;
*/
