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

/*
import Header from './common/Header';
import {connect} from 'react-redux';

class App extends React.Component {
  render () {
    return (
      <div className="container-fluid">
        <Header
          loading={this.props.loading} />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  loading: PropTypes.bool.isRequired
};
// {this.props.children} children passed in from React router, it passes child components as properties

function mapStateToProps(state, ownProps) {
  return {
    loading : state.numAjaxCallsInProgress > 0
  };
}

export default connect(mapStateToProps)(App);

*/
