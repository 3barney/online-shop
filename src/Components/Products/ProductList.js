import React, {PropTypes} from 'react';
import {Segment, Table} from 'semantic-ui-react';
import ProductListRow from './ProductListRow';

const ProductList = ({products}) => {
  return (
    <Table color="teal">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Price</Table.HeaderCell>
          <Table.HeaderCell>Category</Table.HeaderCell>
          <Table.HeaderCell>Quantity</Table.HeaderCell>
          <Table.HeaderCell>Image</Table.HeaderCell>
          <Table.HeaderCell>Color</Table.HeaderCell>
          <Table.HeaderCell>Size</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {products.map(product => <ProductListRow key={product.id} product={product} />)}
      </Table.Body>
    </Table>
  );
};

ProductList.propTypes = {
  products: PropTypes.array.isRequired
};

export default ProductList;
