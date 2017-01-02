import React, {PropTypes} from 'react';

const HeaderPage = ({logged_user}) => {
  if(this.props.logged_user) {
    return (
      <div>From connected</div>
    );
  } else {
    return (
      <div>Hello</div>
    );
   }
};

HeaderPage.propTypes = {
  logged_user: PropTypes.object.isRequired
};


export default HeaderPage;
