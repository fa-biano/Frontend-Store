import React from 'react';
import PropTypes from 'prop-types';
import '../style/ProductCartControl.css';

class ProductCartControl extends React.Component {
  render() {
    const { title, thumbnail, price, qty, handleClickQty, index } = this.props;
    return (
      <div className="cart-product-list">
        <p className="cart-product-list-title" data-testid="shopping-cart-product-name">
          { title }
        </p>
        <img src={ thumbnail } alt={ title } />
        <div className="cart-product-qty-control">
          <button
            type="button"
            value="sub"
            onClick={ handleClickQty }
            data-testid="product-decrease-quantity"
            index={ index }
          >
            -
          </button>
          <span data-testid="shopping-cart-product-quantity">{ qty }</span>
          <button
            type="button"
            value="add"
            onClick={ handleClickQty }
            data-testid="product-increase-quantity"
            index={ index }
          >
            +
          </button>
        </div>
        <p className="cart-product-list-price">
          { (price * qty)
            .toLocaleString('pr-BR', { style: 'currency', currency: 'BRL' }) }
        </p>
      </div>
    );
  }
}

ProductCartControl.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  qty: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  handleClickQty: PropTypes.func.isRequired,
};

export default ProductCartControl;
