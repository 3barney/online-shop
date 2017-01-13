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
      //product:  {name: '', color: '', price: '', size: '', category: ''},
      product: Object.assign({}, this.props.product),
      saving: false
    };

      this.onChange = this.onChange.bind(this);
      this.saveProduct = this.saveProduct.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if (this.props.product.id != nextProps.product.id) {
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
        saveProduct={this.saveProduct}/>
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
  const product = products.filter(product => product.id == id);
  if (product) return product[0]; // Filter returns an array so grab First elem at index 0
  return null;
}

function mapStateToProps(state, ownProps) {
  const productId = ownProps.params.id;
   let product = {name: ' ', color: '', price: '', size: '', categoryName: ''};
   if (productId && state.productsReducer > 0) {
     product = getProductyById(state.productsReducer, productId);
   }

   const productCategoriesFormattedForDropdown = state.productsReducer.map( product => {
     return {
       value : product.category_id,
       text: product.categoryName
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
