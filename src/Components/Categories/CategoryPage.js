/*eslint-disable react/no-did-mount-set-state */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {loadCategories} from './CategoryActions';
import toastr from 'toastr';
import {Progress, Segment, Form, Button, Input, Header, Divider} from 'semantic-ui-react';
import * as _ from 'lodash';
import CategoryList from './CategoryList';

class CategoryPage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      categories: [], fetchingCategories: true, percent: 50, addCategory: false
    };
  }

  componentWillMount(){
    const categoryData = loadCategories();
    categoryData
      .then( (data) => {
        this.setState({fetchingCategories: false, categories: data.categories, percent: 100});
      })
      .catch( (error) => {
        toastr.error(error);
      });
  }

  addCategory(){
    browserHistory.push('/dashboard/category');
  }


  render () {
    return (
      <Segment.Group>
        <Segment padded size="large"
          color="blue"
          className="text container">
          <Form loading={this.state.addCategory}>
            <Header size="medium">ADD A NEW CATEGORY</Header>
            <Form.Field inline>
              <label>Category Name</label>
              <Input fluid
                name="categoryName"
                placeholder="Category Name" />
            </Form.Field>

            <Button primary color="blue" type="button"
              name="submitCategory"
              onClick={this.addCategory}
              disabled={this.state.loggingIn}
              content={this.state.loggingIn ? 'Processing...': 'Submit'} />
          </Form>
        </Segment>

        <Segment color="teal" loading={this.state.fetchingCategories}>
          <Header textAlign="center" size="medium">EXISTING CATEGORIES</Header>
          <CategoryList categories={this.state.categories} />
        </Segment>
      </Segment.Group>
    );

  }
}

export default CategoryPage;


/*
<Segment>
  <Progress percent={this.state.percent} color="green" size="tiny" autoSuccess >
    Fetching Categories
  </Progress>
</Segment>

<Segment>
  <Progress percent={this.state.percent} size="tiny"
    autoSuccess color="green" >
    Categories fetched Successfully
  </Progress>
</Segment>

<Progress percent={this.state.percent}
  autoSuccess color="green" >
  Fetching Categories
</Progress>
<h1>Add me Add me Add me Add me Add me Add me Add me Add me Add me</h1>
*/
