import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {browserHistory, Link} from 'react-router';
import { Sidebar, Segment, Menu, Label, Input, Header, Icon, Image } from 'semantic-ui-react';
import * as _ from 'lodash';

class SideBar extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loggedUSerData: props.logged_user,
      activeItem: 'home',
      visible: true
    };

    this.handleItemClick = this.handleItemClick.bind(this);
    this.redirectToDashboard = this.redirectToDashboard.bind(this);
    this.redirectToCatergories = this.redirectToCatergories.bind(this);
  }

  handleItemClick(event, {name}) {
    this.setState({activeItem: name});
  }

  redirectToDashboard(){
    browserHistory.push("/dashboard/home");
    //browserHistory.push({pathname: '/dashboard', state: {user_info: this.state.loggedUSerData}});
  }

  redirectToCatergories(){

    //ReactDOM.render(<CategoryPage /> , document.getElementById('root-dashboard'));
    //this.setState({activeItem: name});
    browserHistory.push("/dashboard/categories");
  }

  render() {
    if (!_.isNil(this.state.loggedUSerData)){
      const {activeItem} = this.state;
      const {visible} = this.state;
      return (
          <div>
          <Sidebar as={Menu}
            animation="slide along" vertical visible={visible} color="blue">

            <div className="menuItems">
              <Menu.Item name="hide-menu">
                <Icon name="bars" />
                Hide
              </Menu.Item>

              <Menu.Item name="home" active={activeItem === 'home'}
                onClick={this.redirectToDashboard} >
                <Icon name="home" />
                Home
              </Menu.Item>

              <Menu.Item name="categories" active={activeItem === 'categories'}
                onClick={this.redirectToCatergories}>
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
           <div id="root-dashboard">
             {console.log(this.props.children)}
             {this.props.children}
           </div>
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
  logged_user: PropTypes.string.isRequired
};

export default SideBar;
