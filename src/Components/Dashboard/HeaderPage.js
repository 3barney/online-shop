import React, {PropTypes} from 'react';
import * as _ from 'lodash';
import {Menu, Segment} from 'semantic-ui-react';

class HeaderPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loggedUSerData: Object.assign({}, props.logged_user),
      activeItem: 'home'
    };
  }

  render() {
    if (!_.isNil(this.state.loggedUSerData)){
      const activeItem = this.state.activeItem;
      return (
        <Segment inverted>
          <Menu inverted pointing secondary fixed="top" size="large">
            <Menu.Item name="home" active={activeItem === 'home'}>
              {this.state.loggedUSerData.email}
            </Menu.Item>
          </Menu>
        </Segment>
      );
    } else {
      return (
        <div>No user data</div>
      );
    }
  }
}

HeaderPage.propTypes = {
  logged_user: PropTypes.object.isRequired
};


export default HeaderPage;

/**
const HeaderPage = ({logged_user}) => {
  if(logged_user) {
    return (
      <Menu color={color}>
        <Menu.item name="home">
          {logged_user.email}
        </Menu.item>
      </Menu>
    );
  } else {
    return (
      <div>Hello</div>
    );
   }
};**/
