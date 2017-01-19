import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {Table} from 'semantic-ui-react';

const CategoryListRow = ({category}) => {
  return(
    <Table.Row>
      <Table.Cell>
        <Link to={'/dashboard/categories/add/'+category._id}>{category.name}</Link>
      </Table.Cell>
      <Table.Cell>{category.slug}</Table.Cell>
      <Table.Cell>{`${category.created_by.first_name} ${category.created_by.second_name}`}</Table.Cell>
    </Table.Row>
  );
};

CategoryListRow.propTypes = {
  category: PropTypes.object.isRequired
};

export default CategoryListRow;
