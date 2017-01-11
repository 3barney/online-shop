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
      fetchingProducts: true
    };

    this.redirectToAddNewProduct = this.redirectToAddNewProduct.bind(this);
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

  redirectToAddNewProduct(){
    browserHistory.push('/dashboard/products/add');
  }

  render() {
    return (
      <Segment.Group>
        <Segment compact>
          <Button primary color="blue" type="button"
            disabled={this.state.fetchingProducts}
            name="submitCategory"
            onClick={this.redirectToAddNewProduct}
            content="Add New Product" />
        </Segment>
        <Segment color="teal" loading={this.state.fetchingProducts}>
          <Header textAlign="center" size="medium">PRODUCTS</Header>
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
