import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';
import {Segment, Form, Input, Button, Header} from 'semantic-ui-react';
import * as categoriesActions from './CategoryActions';

export class ManageCategoryPage extends React.Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      category: {name: ' '}, addingCategory: false
    };

    this.onChange = this.onChange.bind(this);
    this.addCategory = this.addCategory.bind(this);
  }

  onChange(event) {
    const field = event.target.name;
    const category = this.state.category;
    category[field] = event.target.value;
    return this.setState({category: category});
  }

  addCategory() {
    event.preventDefault();
    this.setState({addingCategory: true});
    this.props.actions.saveCategory(this.state.category)
      .then( ()=> this.redirect())
      .catch( error => {
        toastr.error(error);
        this.setState({addingCategory: false});
      });
  }

  redirect() {
    this.setState({addingCategory:false});
    toastr.success('Category Saved');
    this.context.router.push('/dashboard/categories'); // After save redirect to /courses
  }

  render() {
    return (
      <Segment padded size="large" color="blue" className="text container">
        <Form>
          <Header size="medium">ADD A NEW CATEGORY</Header>
          <Form.Field inline>
            <label>Category Name</label>
            <Input fluid
              name="name"
              placeholder="Category Name"
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
  }
}

ManageCategoryPage.propTypes = {
  actions: PropTypes.object.isRequired
};

// TODO: Still experimental property in react, maybe droped in later versions
ManageCategoryPage.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(categoriesActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(ManageCategoryPage);

/*
<Button primary color="blue" type="button"
  name="submitCategory"
  onClick={this.addCategory}
  disabled={this.state.loggingIn}
   />
*/
