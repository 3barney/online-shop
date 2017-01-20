import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';
import * as _ from 'lodash';
import * as productsActions from './ProductActions';
import {Segment, Button, Header, Icon} from 'semantic-ui-react';
import ProductList from './ProductList';

class ProductPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      products: [],
      fetchingProducts: true,
      noProduct: ''
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
      if(_.isNil(nextProps.productsReducer.message)) {
        this.setState({products: nextProps.productsReducer});
      }
      this.setState({noProduct: nextProps.productsReducer.message});
    }
  }

  redirectToAddNewProduct(){
    browserHistory.push('/dashboard/products/add');
  }

  render() {
    if (this.state.noProduct) {
      return (
        <Segment.Group>
          <Segment compact>
            <Button primary color="blue" type="button"
              name="submitProduct"
              onClick={this.redirectToAddNewProduct}
              content="Add New Product" />
          </Segment>
          <Segment color="teal">
            <Header as="h2" textAlign="center">
              <Icon name="hourglass empty" size="massive"/>
              <Header.Content>
                {this.state.noProduct}
              </Header.Content>
            </Header>
          </Segment>
        </Segment.Group>
      );
    } else {
      return (
        <Segment.Group>
          <Segment compact>
            <Button primary color="blue" type="button"
              disabled={this.state.fetchingProducts}
              name="submitProduct"
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
