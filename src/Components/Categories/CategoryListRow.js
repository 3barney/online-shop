import React, {PropTypes} from 'react';
import {Table} from 'semantic-ui-react';

const CategoryListRow = ({category}) => {
  return(
    <Table.Row>
      <Table.Cell>{category.name}</Table.Cell>
      <Table.Cell>{category.slug}</Table.Cell>
    </Table.Row>
  );
};

CategoryListRow.propTypes = {
  category: PropTypes.object.isRequired
};

export default CategoryListRow;

/*
import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const CourseListRow = ({course}) => {
  return (
    <tr>
      <td><a href={course.watchHref} target="_blank">Watch</a></td>
      <td><Link to={'/course/'+course.id}>{course.title}</Link></td>
      <td>{course.authorId}</td>
      <td>{course.category}</td>
      <td>{course.length}</td>
    </tr>
  );
};

CourseListRow.propTypes = {
  course: PropTypes.object.isRequired
};

export default CourseListRow;
*/
