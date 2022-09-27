import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import AvaliationForm from '../components/AvaliationForm';
import { getProductById } from '../services/api';
import Header from '../components/Header';
import backArrow from '../img/back-arrow.png';
import '../style/Product.css';

export default class Product extends React.Component {
  state = {
    isLoading: true,
    product: {},
    productsOnCart: [],
  };

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = async () => {
    const { match } = this.props;
    const {
      params: { id },
    } = match;
    const product = await getProductById(id);
    this.setState({
      isLoading: false,
      product,
    });
  };

  readCartItems = (key) => JSON.parse(localStorage.getItem(key));

  saveLocal = () => {
    const { product } = this.state;
    product.qty = 1;
    if (this.readCartItems('productsOnCart') !== null) {
      const productsStorage = this.readCartItems('productsOnCart');
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
  };

  render() {
    const { isLoading, product } = this.state;
    return (
      <div>
        <Header />
        {isLoading ? (
          <p>Carregando...</p>
        ) : (
          <section>
            <section className="product-details-container">
              <Link className="back-link" to="/">
                <img src={ backArrow } alt="imagem do botao de voltar" />
                <span>Voltar</span>
              </Link>
              <div className="product-details">
                <h2 data-testid="product-detail-name">{product.title}</h2>
                <img
                  src={ product.pictures[0].url }
                  alt={ product.title }
                  data-testid="product-detail-image"
                />
                <p data-testid="product-detail-price">
                  {(product.price)
                    .toLocaleString('pr-BR', { style: 'currency', currency: 'BRL' })}
                </p>
                <button
                  type="button"
                  data-testid="product-detail-add-to-cart"
                  onClick={ this.saveLocal }
                  className="btn-add-cart"
                >
                  Adicionar ao Carrinho
                </button>
              </div>
              <div className="product-specifications">
                <h2>Especificações Técnicas</h2>
                <ul>
                  {
                    product.attributes.map((element) => (
                      <li key={ `${element.value_id}-${element.name}` }>
                        <span>{`${element.name}: `}</span>
                        <span>{element.value_name}</span>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </section>
            <AvaliationForm id={ product.id } />
          </section>
        )}
      </div>
    );
  }
}

Product.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
