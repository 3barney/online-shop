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
          <Menu pointing fixed="top" secondary size="huge" color="blue" inverted>
              <Menu.Item name="about" active={activeItem === 'about'}>
                Home
              </Menu.Item>
              <Menu.Item name="dummy" active={activeItem === 'dummy'}>
                About
              </Menu.Item>
              <Menu.Item name="contact" active={activeItem === 'contact'}>
                Contact
              </Menu.Item>
              <Menu.Menu position="right">
                <Menu.Item name="home" active={activeItem === 'home'}>
                  {this.state.loggedUSerData.email}
                </Menu.Item>
                <Menu.Item name="logout" active={activeItem === 'logout'} onClick={this.handleItemClick} />
              </Menu.Menu>
          </Menu>
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
