/*eslint-disable react/no-did-mount-set-state */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import * as categoriesActions from './CategoryActions';
import toastr from 'toastr';
import {Progress, Segment, Form, Button, Input, Header, Divider} from 'semantic-ui-react';
import * as _ from 'lodash';
import CategoryList from './CategoryList';

class CategoryPage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      categories: [],
      fetchingCategories: true,
      addingCategory: false,
      category: {name: ' '}
    };

    this.onChange = this.onChange.bind(this);
    this.addCategory = this.addCategory.bind(this);
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
      this.setState({categories: nextProps.categoryReducer});
    }
  }

  onChange(event) {
    const field = event.target.name;
    const category = this.state.category;
    category[field] = event.target.value;
    return this.setState({category: category});
  }

  addCategory(){
    event.preventDefault();
    this.setState({addingCategory: true});
    this.props.actions.saveCategory(this.state.category)
      .then( ()=> this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({addingCategory: false});
      });
  }

  redirect(){
    this.setState({addingCategory:false});
    toastr.success('Category Saved');
    // this.state.categories.push(this.state.category); // TODO: HACK to make it work
    this.context.router.push('/dashboard/categories'); // After save redirect to /courses
  }

  render () {
    const {categoryReducer} = this.props;
    console.log(categoryReducer)
    return (
      <Segment.Group>
        <Segment padded size="large" loading={this.state.addCategory}
          color="blue"
          className="text container">
          <Form loading={this.state.addCategory}>
            <Header size="medium">ADD A NEW CATEGORY</Header>
            <Form.Field inline>
              <label>Category Name</label>
              <Input fluid
                onChange={this.onChange}
                name="name"
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

CategoryPage.propTypes = {
  actions: PropTypes.object.isRequired,
  categoryReducer: PropTypes.array.isRequired
};

CategoryPage.contextTypes = {
  router: PropTypes.object.isRequired
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
