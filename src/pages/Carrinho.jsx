import React from 'react';
import { Link } from 'react-router-dom';
import ProductCartControl from '../components/ProductCartControl';
import '../style/Carrinho.css';
import Header from '../components/Header';
import backArrow from '../img/back-arrow.png';

class Carrinho extends React.Component {
  state = {
    products: [],
    finalOrder: 0,
  };

  componentDidMount() {
    const GET_PRODUCTS = localStorage.getItem('productsOnCart');
    this.setState({
      products: JSON.parse(GET_PRODUCTS),
    }, () => this.updateTotalPrice());
  }

  removeProduct = ({ target }) => {
    const { products } = this.state;
    const child = target.parentElement;
    const parent = child.parentElement;
    const index = Array.from(parent.children).indexOf(child) - 1;

    const productDiv = [...products];
    productDiv.splice(index, 1);
    this.setState({ products: productDiv });
    localStorage.setItem('productsOnCart', JSON.stringify(productDiv));
  };

  handleClickQty = ({ target }) => {
    const { products } = this.state;
    const { attributes, value } = target;
    const index = Number(attributes.index.value);

    const updateProducts = products;

    if (value === 'add') {
      updateProducts[index].qty += 1;
    }

    if (value === 'sub' && updateProducts[index].qty > 1) {
      updateProducts[index].qty -= 1;
    }

    this.setState({ products: [...updateProducts] }, () => this.updateTotalPrice());
    localStorage.setItem('productsOnCart', JSON.stringify(updateProducts));
  };

  updateTotalPrice = () => {
    const { products } = this.state;
    this.setState({ finalOrder: 0 });
    if (products && products.length > 0) {
      const productPrices = products.map((element) => element.price * element.qty);
      const totalPrice = productPrices.reduce((acc, curr) => acc + curr);
      this.setState({ finalOrder: totalPrice });
    }
  };

  render() {
    const { products, finalOrder } = this.state;
    return (
      <div>
        <Header />
        <section className="cart-details-container">
          <Link className="back-link" to="/">
            <img src={ backArrow } alt="imagem do botao de voltar" />
            <span>Voltar</span>
          </Link>
          <div className="div-father-shopping">
            { (!products || products.length === 0)
              ? <h2 className="empity-card">Seu carrinho está vazio </h2>
              : (
                <section className="shopping-cart-card">
                  <h2>Carrinho de Compras</h2>
                  {
                    products.map((product, index) => {
                      const { title, thumbnail, price, qty } = product;
                      return (
                        <div key={ title } className="cart-product-container">
                          <button
                            type="button"
                            data-testid="remove-product"
                            onClick={ this.removeProduct }
                            className="remove-btn"
                          >
                            X
                          </button>
                          <ProductCartControl
                            title={ title }
                            thumbnail={ thumbnail }
                            price={ price }
                            qty={ qty }
                            index={ index }
                            handleClickQty={ this.handleClickQty }
                          />
                        </div>
                      );
                    })
                  }
                </section>
              )}
          </div>
          <div className="checkout-card">
            <h2>Valor Total da Compra:</h2>
            <h3>
              {finalOrder.toLocaleString('pr-BR', { style: 'currency', currency: 'BRL' })}
            </h3>
            <Link
              to="/checkout"
              data-testid="checkout-products"
              className="checkout-link"
            >
              Finalizar Compra
            </Link>
          </div>

        </section>
      </div>
    );
  }
}

export default Carrinho;
