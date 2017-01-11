import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';
import * as productsActions from './ProductActions';
import {Segment, Button, Header} from 'semantic-ui-react';
import ProductList from './ProductList';

class ProductPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      products: [],
      fetchingProducts: false
    };
  }

  componentWillMount() {
    this.props.actions.loadProducts()
      .then( () => {
        this.setState({fetchingProducts: false});
      })
      .catch( (error) => {
        toastr.error(error);
      });
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.productsReducer != nextProps.productsReducer) {
      this.setState({products: nextProps.productsReducer});
    }
  }

  render() {
    return (
      <Segment.Group>
        <Segment compact>
          <Button primary color="blue" type="button"
            disabled={this.state.fetchingCategories}
            name="submitCategory"
            onClick={this.redirectToAddNewProduct}
            content="Add New Category" />
        </Segment>
        <Segment color="teal" loading={this.state.fetchingCategories}>
          <Header textAlign="center" size="medium">EXISTING CATEGORIES</Header>
          <ProductList products={this.state.products} />
        </Segment>
      </Segment.Group>
    );
  }
}

ProductPage.propTypes = {
  actions: PropTypes.object.isRequired,
  productsReducer: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    productsReducer: state.productsReducer
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(productsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
