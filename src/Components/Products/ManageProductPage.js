import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';
import * as _ from 'lodash';
import * as productsActions from './ProductActions';
import ProductForm from './ProductForm';

class ManageProductPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      product: Object.assign({}, this.props.product),
      saving: false
    };

      this.onChange = this.onChange.bind(this);
      this.saveProduct = this.saveProduct.bind(this);
      this.editProduct = this.editProduct.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if (this.props.product._id != nextProps.product._id) {
      this.setState({product: Object.assign({}, nextProps.product)});
    }
  }

  onChange(event) {
    const field = event.target.name;
    const product = this.state.product;
    product[field] = _.trim(event.target.value);
    return this.setState({product: product});
  }

  saveProduct(event){
    event.preventDefault();
    this.setState({saving: true});
    this.props.actions.saveProduct(this.state.product)
      .then( () => this.redirect())
      .catch( error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

  editProduct(event) {
    event.preventDefault();
    this.setState({saving: true});
    this.props.actions.editProduct(this.state.product)
      .then( () => this.redirect())
      .catch( error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

  redirect() {
    this.setState({saving:false});
    toastr.success('Product Saved');
    this.context.router.push('/dashboard/products'); // After save redirect to /courses
  }

  render() {
    return (
      <ProductForm
        product={this.state.product}
        allCategories={this.props.categories}
        onChange={this.onChange}
        saving={this.state.saving}
        saveProduct={this.saveProduct}
        editProduct={this.editProduct} />
    );
  }
}

ManageProductPage.propTypes = {
  actions: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired
};

// TODO: Still experimental property in react, maybe droped in later versions
ManageProductPage.contextTypes = {
  router: PropTypes.object.isRequired
};

function getProductyById(products, id) {
  const product = products.filter(product => product._id == id);
  if (product) return product[0]; // Filter returns an array so grab First elem at index 0
  return null;
}

function mapStateToProps(state, ownProps) {
  const productId = ownProps.params.id;
  let product = {_id: '', name: '', color: '', price: '', size: '', category_name: '', description: ''};
  if (productId && state.productsReducer.length > 0) {
   product = getProductyById(state.productsReducer, productId);
  }

  // TODO<ASAP>: ENSURE CATEGORIES REDUCER FETCHES BEFORE PRODUCTS

  const productCategoriesFormattedForDropdown = state.categoryReducer.map( category => {
    return {
      value : category._id,
      text: category.name
    };
  });

  // since value is our index
  const productCategories = _.uniqBy(productCategoriesFormattedForDropdown, 'value');

  return {
    product: product,
    categories: productCategories
   };

}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(productsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageProductPage);
