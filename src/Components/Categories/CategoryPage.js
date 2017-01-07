import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {loadCategories} from './CategoryActions';
import toastr from 'toastr';
import {Progress} from 'semantic-ui-react';

class CategoryPage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      categories: {}, fetchingCategories: true, percent: 0
    };
  }

  componentWillMount(){
    const categoryData = loadCategories();
    categoryData
      .then( (data) => {
        console.log(data);
        this.setState({fetchingCategories: false, categories: data});
      })
      .catch( (error) => {
        toastr.error(error);
      });
  }

  componentDidMount() {
    this.setState({percent: 100});
  }

  render () {

    console.log("in Render")
    console.log(this.state.fetchingCategories)

    if(this.state.fetchingCategories === true) {

        return (
          <div>
            <Progress percent={this.state.percent}
              autoSuccess color="green" >
              Fetching Categories
            </Progress>

          </div>

        );
    } else {
      return (
        <div>
          {toastr.clear()}
          <p>Am here</p>
        </div>
      )
    }


  }
}

CategoryPage.propTypes = {
  actions: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    categories: state.categoryReducer   // We will access it by this.props.courses in our Component
  };
}

export default CategoryPage;

/*
<Progress percent={this.state.percent}
  autoSuccess color="green" >
  Fetching Categories
</Progress>
<h1>Add me Add me Add me Add me Add me Add me Add me Add me Add me</h1>
*/
