/* This component handles The app template used on evrey page */
import React, {PropTypes} from 'react';
import {Container, Header} from "semantic-ui-react";

class App extends React.Component {
  render () {
    return (
      <Container fluid>
        <Header as="h2" textAlign="center">Add header Navbar here</Header>
        {this.props.children}
      </Container>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;
