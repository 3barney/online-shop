import React, {PropTypes} from 'react';
import { Menu, Input, Label } from 'semantic-ui-react';
import * as _ from 'lodash';

class SideBar extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loggedUSerData: Object.assign({}, props.logged_user),
      activeItem: 'dashboard'
    };
  }

  render() {
    if (!_.isNil(this.state.loggedUSerData)){
      const activeItem = this.state.activeItem;
      return (
        <Menu vertical>
          <Menu.Item name="inbox" active={activeItem === 'inbox'}
            onClick={this.handleItemClick}>
            <Label color="teal">1</Label>
            Inbox
          </Menu.Item>

          <Menu.Item name="spam" active={activeItem === 'spam'}
            onClick={this.handleItemClick}>
            <Label>51</Label>
            Spam
            <Menu.Menu>
           <Menu.Item name="search" active={activeItem === 'search'} onClick={this.handleItemClick}>
             Search
           </Menu.Item>
           <Menu.Item name="add" active={activeItem === 'add'} onClick={this.handleItemClick}>
             Add
           </Menu.Item>
           <Menu.Item name="about" active={activeItem === 'about'} onClick={this.handleItemClick}>
             Remove
           </Menu.Item>
         </Menu.Menu>
          </Menu.Item>

          <Menu.Item name="updates" active={activeItem === 'updates'}
            onClick={this.handleItemClick}>
            <Label>1</Label>
            Updates
          </Menu.Item>
          <Menu.Item>
            <Input icon="search" placeholder="Search mail..." />
          </Menu.Item>
        </Menu>
      );
    }else{
      return (
        <div>No user data</div>
      );
    }
  }
}

SideBar.propTypes = {
  logged_user: PropTypes.object.isRequired
};

export default SideBar;
