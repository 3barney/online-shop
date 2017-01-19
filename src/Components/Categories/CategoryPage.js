/*eslint-disable react/no-did-mount-set-state */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';
import { Progress, Segment, Form, Button, Input, Header, Divider, Icon} from 'semantic-ui-react';
import * as _ from 'lodash';
import CategoryList from './CategoryList';
import * as categoriesActions from './CategoryActions';

class CategoryPage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      categories: [],
      fetchingCategories: true,
      addingCategory: false,
      noCategory: ''
    };

    this.redirectToAddNewCategory = this.redirectToAddNewCategory.bind(this);
  }

  componentWillMount(){
    this.props.actions.loadCategories()
      .then( () => {
        this.setState({fetchingCategories: false});
      })
      .catch( (error) => {
        toastr.error(error);
      });
  }

  componentWillReceiveProps(nextProps){
    if(this.props.categoryReducer != nextProps.categoryReducer){
      if(_.isNil(nextProps.categoryReducer.message)) {
        this.setState({categories: nextProps.categoryReducer});
      }
      this.setState({noCategory: nextProps.categoryReducer.message});
    }
  }


  redirectToAddNewCategory(){
    browserHistory.push('/dashboard/categories/add');
  }

  render () {
    // const {categoryReducer} = this.props;
    if(this.state.noCategory) {
      return (
        <Segment.Group>
          <Segment compact>
            <Button primary color="blue" type="button"
              name="submitCategory"
              onClick={this.redirectToAddNewCategory}
              content="Add New Category" />
          </Segment>
          <Segment color="teal">
            <Header as="h2" textAlign="center">
              <Icon name="hourglass empty" size="massive"/>
              <Header.Content>
                {this.state.noCategory}
              </Header.Content>
            </Header>
          </Segment>
        </Segment.Group>
      );
    } else {
      return (
        <Segment.Group>
          <Segment compact>
            <Button primary color="blue" type="button"
              disabled={this.state.fetchingCategories}
              name="submitCategory"
              onClick={this.redirectToAddNewCategory}
              content="Add New Category" />
          </Segment>

          <Segment color="teal" loading={this.state.fetchingCategories}>
            <Header textAlign="center" size="medium">EXISTING CATEGORIES</Header>
            <CategoryList categories={this.state.categories} />
          </Segment>
        </Segment.Group>
      );
    }
  }
}

CategoryPage.propTypes = {
  actions: PropTypes.object.isRequired,
  categoryReducer: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    categoryReducer: state.categoryReducer
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(categoriesActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);


/* ADD SEGEMENT PAGE

*/
