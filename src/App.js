import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
// import './App.css';
import Home from './pages/Home';
import Carrinho from './pages/Carrinho';
import Product from './pages/Product';
import Checkout from './pages/Checkout';

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/carrinho" component={ Carrinho } />
          <Route exact path="/product/:id" component={ Product } />
          <Route exact path="/checkout" component={ Checkout } />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
