import React, {PropTypes} from 'react';
import * as _ from 'lodash';
import {Segment, Form, Input, Button, Header} from 'semantic-ui-react';

const CategoryForm = ({category, onChange, addCategory, editCategory, saving}) => {
  if (category._id.length > 0) {
    return (
      <Segment padded size="large" color="blue" className="text container">
        <Form>
          <Header size="medium">EDIT CATEGORY</Header>
          <Form.Field inline>
            <label>Category Name</label>
            <Input fluid
              name="name"
              placeholder="Category Name"
              defaultValue={category.name}
              onChange={onChange}  />
          </Form.Field>

          <Button primary color="blue" type="button"
            name="submitCategory"
            disabled={saving}
            onClick={editCategory}
            content={saving ? 'Processing...': 'Submit'} />
        </Form>
      </Segment>
    );
  } else {
    return (
      <Segment padded size="large" color="blue" className="text container">
        <Form>
          <Header size="medium">ADD A NEW CATEGORY</Header>
          <Form.Field inline>
            <label>Category Name</label>
            <Input fluid
              name="name"
              placeholder="Category Name"
              defaultValue={category.name}
              onChange={onChange}  />
          </Form.Field>

          <Button primary color="blue" type="button"
            name="submitCategory"
            disabled={saving}
            onClick={addCategory}
            content={saving ? 'Processing...': 'Submit'} />
        </Form>
      </Segment>
    );
  }
};

CategoryForm.propTypes = {
  category: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired,
  addCategory: React.PropTypes.func.isRequired,
  editCategory: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool
};

export default CategoryForm;
