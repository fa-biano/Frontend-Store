import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../style/ProductCard.css';

class ProductCard extends React.Component {
  state = {
    productsOnCart: [],
  };

  readCartItems = () => JSON.parse(localStorage.getItem('productsOnCart'));

  addToCart = () => {
    const { name: title, image: thumbnail, price } = this.props;
    const product = { title, thumbnail, price, qty: 1 };
    if (this.readCartItems() !== null) {
      const productsStorage = this.readCartItems();
      productsStorage.push(product);
      localStorage.setItem('productsOnCart', JSON.stringify(productsStorage));
      this.setState({ productsOnCart: productsStorage });
    } else {
      this.setState(
        (prevState) => ({
          productsOnCart: [...prevState.productsOnCart, product],
        }),
        () => {
          const { productsOnCart } = this.state;
          localStorage.setItem(
            'productsOnCart',
            JSON.stringify(productsOnCart),
          );
        },
      );
    }
    const { toForceUpdate } = this.props;
    toForceUpdate();
  };

  render() {
    const { name, image, price, id } = this.props;
    return (
      <section className="product-card">
        <Link
          to={ `/product/${id}` }
          data-testid="product-detail-link"
          className="link"
        >
          <div data-testid="product" className="product">
            <img src={ image } alt={ name } className="image-card" />
            <p>{name}</p>
          </div>
        </Link>
        <p>
          {(price)
            .toLocaleString('pr-BR', { style: 'currency', currency: 'BRL' })}
        </p>
        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ this.addToCart }
          className="btn-addToCart"
        >
          Adicionar ao Carrinho
        </button>
      </section>
    );
  }
}

ProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  toForceUpdate: PropTypes.func.isRequired,
};

export default ProductCard;
