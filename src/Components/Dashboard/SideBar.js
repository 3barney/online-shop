import React, {PropTypes} from 'react';
import {browserHistory} from 'react-router';
import { Sidebar, Segment, Menu, Label, Input, Header, Icon, Image } from 'semantic-ui-react';
import * as _ from 'lodash';

class SideBar extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loggedUSerData: Object.assign({}, props.logged_user),
      activeItem: 'home',
      visible: true
    };

    this.handleItemClick = this.handleItemClick.bind(this);
    this.redirectToDashboard = this.redirectToDashboard.bind(this);

  }

  handleItemClick(event, {name}) {
    this.setState({activeItem: name});
  }

  redirectToDashboard(){
    browserHistory.push({pathname: '/dashboard', state: {user_info: this.state.loggedUSerData}});
  }

  render() {
    if (!_.isNil(this.state.loggedUSerData)){
      const {activeItem} = this.state;
      const {visible} = this.state;
      return (
          <div>
          <Sidebar as={Menu} animation="slide along" vertical visible={visible} color="teal">

            <div className="menuItems">
              <Menu.Item name="hide-menu">
                <Icon name="bars" />
                Hide
              </Menu.Item>

              <Menu.Item name="home" active={activeItem === 'home'}
                onClick={this.handleItemClick && this.redirectToDashboard} >
                <Icon name="home" />
                Home
              </Menu.Item>

              <Menu.Item name="categories" active={activeItem === 'categories'}
                onClick={this.handleItemClick} >
                <Icon name="tasks" />
                Categories
              </Menu.Item>

              <Menu.Item>
                <Icon name="sidebar" />
                Products
                <Menu.Menu>
                  <Menu.Item name="list-products" active={activeItem === 'list-products'}
                   onClick={this.handleItemClick} >
                   List
                 </Menu.Item>
                 <Menu.Item name="add-products" active={activeItem == 'add-products'}
                   onClick={this.handleItemClick} >
                   Add
                 </Menu.Item>
                </Menu.Menu>
              </Menu.Item>

              <Menu.Item name="orders" active={activeItem === 'orders'}
                onClick={this.handleItemClick} >
                <Label color="red">20</Label>
                Orders
              </Menu.Item>

              <Menu.Item name="customers" active={activeItem === 'customers'}
                onClick={this.handleItemClick} >
                <Icon name="users" />
                Customers
              </Menu.Item>
            </div>
          </Sidebar>

          <Sidebar.Pusher className="sidebarr">
           <Segment>
             <Header as="h3">Application Content</Header>
             <Image src="http://semantic-ui.com/images/wireframe/paragraph.png" />
             <Image src="http://semantic-ui.com/images/wireframe/paragraph.png" />
           </Segment>
         </Sidebar.Pusher>
       </div>
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
