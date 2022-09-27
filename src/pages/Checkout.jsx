import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import Header from '../components/Header';
import backArrow from '../img/back-arrow.png';
import BuyerForm from '../components/BuyerForm';
import '../style/Checkout.css';

class Checkout extends React.Component {
  state = {
    products: [],
    fullName: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    address: '',
    paymentType: '',
    error: false,
    redirect: false,
    finalOrder: 0,
  };

  componentDidMount() {
    const GET_PRODUCTS = localStorage.getItem('productsOnCart');
    this.setState({
      products: JSON.parse(GET_PRODUCTS),
    }, () => this.updateTotalPrice());
  }

  updateTotalPrice = () => {
    const { products } = this.state;
    this.setState({ finalOrder: 0 });
    if (products.length > 0) {
      const productPrices = products.map((element) => element.price * element.qty);
      const totalPrice = productPrices.reduce((acc, curr) => acc + curr);
      this.setState({ finalOrder: totalPrice });
    }
  };

  removeProduct = ({ target }) => {
    const { products } = this.state;
    const child = target.parentElement;
    const parent = child.parentElement;
    const index = Array.from(parent.children).indexOf(child) - 1;

    const productDiv = [...products];
    productDiv.splice(index, 1);
    this.setState({ products: productDiv }, () => this.updateTotalPrice());
    localStorage.setItem('productsOnCart', JSON.stringify(productDiv));
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  validateForm = () => {
    const {
      fullName,
      email,
      cpf,
      phone,
      cep,
      address,
      paymentType,
    } = this.state;

    if (
      fullName.length > 0
      && email.length > 0
      && cpf.length > 0
      && phone.length > 0
      && cep.length > 0
      && address.length > 0
      && paymentType.length > 0
    ) {
      this.setState({
        error: false,
        redirect: true,
      });
      localStorage.removeItem('productsOnCart');
    } else {
      this.setState({ error: true });
    }
  };

  handleClick = () => {
    this.validateForm();
  };

  render() {
    const { products, error, redirect, finalOrder } = this.state;
    return (
      <div>
        <Header />
        <section className="checkout-container">
          <Link className="back-link" to="/carrinho">
            <img src={ backArrow } alt="imagem do botao de voltar" />
            <span>Voltar</span>
          </Link>
          <div className="checkout-product">
            <h2>Revise seus Produtos</h2>
            {
              products.map((element) => (
                <div className="checkout-product-list" key={ element.thumbnail }>
                  <button
                    type="button"
                    data-testid="remove-product"
                    onClick={ this.removeProduct }
                    className="remove-btn"
                  >
                    X
                  </button>
                  <p className="checkout-product-list-title">{ element.title }</p>
                  <img src={ element.thumbnail } alt={ element.title } />
                  <p className="checkout-product-list-price">
                    {
                      (element.price * element.qty)
                        .toLocaleString('pr-BR', { style: 'currency', currency: 'BRL' })
                    }
                  </p>
                </div>
              ))
            }
            <h3>
              {
                `Total: ${finalOrder
                  .toLocaleString('pr-BR', { style: 'currency', currency: 'BRL' })}`
              }
            </h3>
          </div>
          <BuyerForm
            error={ error }
            handleChange={ this.handleChange }
            handleClick={ this.handleClick }
          />
        </section>
        { redirect && <Redirect to="/" /> }
      </div>
    );
  }
}

export default Checkout;
