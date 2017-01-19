import React, {PropTypes} from 'react';
import {Segment, Table} from 'semantic-ui-react';
import CategoryListRow from './CategoryListRow';

const CategoryList = ({categories}) => {
  return (
    <Table color="teal">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Slug</Table.HeaderCell>
          <Table.HeaderCell>Created By</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {categories.map(category => <CategoryListRow key={category._id} category={category} />)}
      </Table.Body>
    </Table>
  );
};

CategoryList.propTypes = {
  categories: PropTypes.array.isRequired
};

export default CategoryList;
