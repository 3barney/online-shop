import React, {PropTypes} from 'react';
import {Segment, Form, Input, Button, Header, Dropdown, Label} from 'semantic-ui-react';

const ProductForm = ({product, allCategories, onChange, saving, saveProduct}) => {

  return (
    <Segment padded size="large" color="blue" className="text container">
      <Form>
        <Header size="medium">ADD A NEW PRODUCT</Header>
        <Form.Field inline>
          <label>Name</label>
          <Input fluid
            name="productName"
            placeholder="Product Name"
            defaultValue={product.name}
            onChange={onChange}  />
        </Form.Field>
        <Form.Field inline>
          <label>Price</label>
          <Input fluid labelPosition="right" type="text" placeholder="Amount"
            name="productPrice" defaultValue={product.price} onChange={onChange}>
            <Label basic>Ksh</Label>
            <input />
            <Label>.00</Label>
          </Input>
        </Form.Field>
        <Form.Field inline>
          <label>Color</label>
          <Input fluid
            name="productColor"
            placeholder="Product Color"
            defaultValue={product.color}
            onChange={onChange}  />
        </Form.Field>
        <Form.Field inline>
          <label>Size</label>
          <Input fluid
            name="productSize"
            placeholder="Product size"
            defaultValue={product.size}
            onChange={onChange}  />
        </Form.Field>
        <Form.Field>
          <label>Product Category</label>
          <Dropdown placeholder="Select Category" search selection
            options={allCategories} />
        </Form.Field>

        <Button primary color="blue" type="button"
          name="submitProduct"
          disabled={saving}
          onClick={saveProduct}
          content={saving ? 'Processing...': 'Submit'} />
      </Form>
    </Segment>
  );
};

ProductForm.propTypes = {
  product: React.PropTypes.object.isRequired,
  allCategories: React.PropTypes.array,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool.isRequired,
  saveProduct: React.PropTypes.func.isRequired
};

export default ProductForm;
