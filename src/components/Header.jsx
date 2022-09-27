import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo.png';
import carrinho from '../img/shopping-cart.png';
import '../style/Header.css';

class Header extends React.Component {
  state = {
    products: [],
  };

  componentDidMount() {
    const GET_PRODUCTS = localStorage.getItem('productsOnCart');
    if (GET_PRODUCTS) {
      this.setState({ products: JSON.parse(GET_PRODUCTS) });
    }
  }

  componentDidUpdate(_, prevState) {
    const GET_PRODUCTS = JSON.parse(localStorage.getItem('productsOnCart'));
    if (GET_PRODUCTS && GET_PRODUCTS.length !== prevState.products.length) {
      this.setState({ products: GET_PRODUCTS });
    }
  }

  render() {
    const { products } = this.state;
    return (
      <header>
        <div className="header-children">
          <div>
            <Link to="/">
              <img src={ logo } alt="logo front end store" className="logo-space" />
            </Link>
          </div>
          <Link to="/Carrinho" data-testid="shopping-cart-button">
            <img
              src={ carrinho }
              alt="logo de carrinho de compras"
            />
            {
              products.length > 0 && <p className="cart-products">{products.length}</p>
            }
          </Link>
        </div>
      </header>
    );
  }
}
export default Header;
