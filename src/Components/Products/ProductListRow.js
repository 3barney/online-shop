import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {Table, Image} from 'semantic-ui-react';

const ProductListRow = ({product}) => {
  return (
    <Table.Row>
      <Table.Cell>
        <Link to={'/dashboard/categories/add/'+product.id}>{product.name}</Link>
      </Table.Cell>
      <Table.Cell>{product.price}</Table.Cell>
      <Table.Cell>{product.categoryName}</Table.Cell>
      <Table.Cell>{product.quantity}</Table.Cell>
      <Table.Cell><Image src={product.image} avatar /></Table.Cell>
      <Table.Cell>{product.color}</Table.Cell>
      <Table.Cell>{product.size}</Table.Cell>
    </Table.Row>
  );
};

ProductListRow.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductListRow;
