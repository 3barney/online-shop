import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';
import CategoryForm from './CategoryForm';

import * as categoriesActions from './CategoryActions';

export class ManageCategoryPage extends React.Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      category: {name: ' '},
      saving: false
    };

    this.onChange = this.onChange.bind(this);
    this.addCategory = this.addCategory.bind(this);
  }

  componentWillReceiveProps(nextProps){
    console.log("nextProps")
    console.log(nextProps)
    console.log(this.props)
    this.setState({category: Object.assign({}, nextProps.category)});
    //if (this.props.category.id != nextProps.category.id) {
      //this.setState({category: Object.assign({}, nextProps.category)});
    //}
  }

  onChange(event) {
    const field = event.target.name;
    const category = this.state.category;
    category[field] = event.target.value;
    return this.setState({category: category});
  }

  addCategory() {
    event.preventDefault();
    this.setState({saving: true});
    this.props.actions.saveCategory(this.state.category)
      .then( ()=> this.redirect())
      .catch( error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

  redirect() {
    this.setState({saving:false});
    toastr.success('Category Saved');
    this.context.router.push('/dashboard/categories'); // After save redirect to /courses
  }

  render() {
    return(
      <CategoryForm
        category={this.state.category}
        onChange={this.onChange}
        addCategory={this.addCategory}
        saving={this.state.saving} />
    );
  }
}

ManageCategoryPage.propTypes = {
  actions: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired
};

// TODO: Still experimental property in react, maybe droped in later versions
ManageCategoryPage.contextTypes = {
  router: PropTypes.object.isRequired
};

function getCategoryById(categories, id) {
  const category = categories.filter(category => category.id == id);
  if (category) return category[0]; // Filter returns an array so grab First elem at index 0
  return null;
}

function mapStateToProps(state, ownProps) {
  const categoryId = ownProps.params.id; // Fetch Cat.Id from URL
  let category = {name: ' '};
  if (categoryId && state.categoryReducer.length > 0) {
    // Pass it all categories in state and of-course ID
    category = getCategoryById(state.categoryReducer, categoryId);
  }

  return {
    category
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(categoriesActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCategoryPage);

/*
return (
  <Segment padded size="large" color="blue" className="text container">
    <Form>
      <Header size="medium">ADD A NEW CATEGORY</Header>
      <Form.Field inline>
        <label>Category Name</label>
        <Input fluid
          name="name"
          placeholder="Category Name"
          content={this.props.category}
          onChange={this.onChange}  />
      </Form.Field>

      <Button primary color="blue" type="button"
        name="submitCategory"
        disabled={this.state.loggingIn}
        onClick={this.addCategory}
        content={this.state.loggingIn ? 'Processing...': 'Submit'} />
    </Form>
  </Segment>
);
*/
