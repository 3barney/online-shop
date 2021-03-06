import React, {PropTypes} from 'react';
import {Segment, Form, Input, Button, Header, Label, Dropdown} from 'semantic-ui-react';
import SelectInput from '../../common/SelectInput';

const ProductForm = ({product, allCategories, onChange, saving, saveProduct}) => {

  return (
    <Segment padded size="large" color="blue" className="text container">
      <Form>
        <Header size="medium">ADD A NEW PRODUCT</Header>
        <Form.Field inline>
          <label>Name</label>
          <Input fluid
            name="name"
            placeholder="Product Name"
            defaultValue={product.name}
            onChange={onChange}  />
        </Form.Field>
        <Form.Field inline>
          <label>Price</label>
          <Input fluid labelPosition="right" type="text" placeholder="Amount"
            name="price" defaultValue={product.price} onChange={onChange}>
            <Label basic>Ksh</Label>
            <input />
            <Label>.00</Label>
          </Input>
        </Form.Field>
        <Form.Field inline>
          <label>Quantity</label>
          <Input fluid
            name="quantity"
            placeholder="Quantity"
            defaultValue={product.quantity}
            onChange={onChange}  />
        </Form.Field>
        <Form.Field inline>
          <label>Color</label>
          <Input fluid
            name="color"
            placeholder="Product Color"
            defaultValue={product.color}
            onChange={onChange}  />
        </Form.Field>
        <Form.Field inline>
          <label>Size</label>
          <Input fluid
            name="size"
            placeholder="Product size"
            defaultValue={product.size}
            onChange={onChange}  />
        </Form.Field>
        <Form.Field>
          <SelectInput
            name="categoryName"
            label="Product Category"
            value={product.categoryName}
            defaultOption="Select Product Category"
            options={allCategories}
            onChange={onChange} />
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
