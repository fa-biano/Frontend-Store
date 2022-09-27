import React from 'react';
import PropTypes from 'prop-types';
import barCode from '../img/icon-barcode.png';
import visa from '../img/icon-Visa.png';
import masterCard from '../img/icon-MasterCard.png';
import elo from '../img/icon-elo.png';

class BuyerForm extends React.Component {
  render() {
    const { error, handleChange, handleClick } = this.props;
    return (
      <form className="buyer-info-container">
        <h2>Informações do Comprador</h2>
        { error && <p className="error-msg" data-testid="error-msg">Campos inválidos</p>}
        <input
          type="text"
          className="buyer-w50"
          name="fullName"
          data-testid="checkout-fullname"
          onChange={ handleChange }
          placeholder="Nome Completo"
        />
        <input
          type="text"
          className="buyer-w50"
          name="cpf"
          data-testid="checkout-cpf"
          onChange={ handleChange }
          placeholder="CPF"
        />
        <input
          type="email"
          className="buyer-w50"
          name="email"
          data-testid="checkout-email"
          onChange={ handleChange }
          placeholder="Email"
        />
        <input
          type="tel"
          className="buyer-w50"
          name="phone"
          data-testid="checkout-phone"
          onChange={ handleChange }
          placeholder="Telefone"
        />
        <input
          type="text"
          className="buyer-w33"
          name="cep"
          data-testid="checkout-cep"
          onChange={ handleChange }
          placeholder="CEP"
        />
        <input
          type="text"
          className="buyer-w66"
          name="address"
          data-testid="checkout-address"
          onChange={ handleChange }
          placeholder="Endereço"
        />
        <input type="text" className="buyer-w66" placeholder="Complemento" />
        <input type="text" className="buyer-w33" placeholder="Número" />
        <input type="text" className="buyer-w66" placeholder="Cidade" />
        <input type="text" className="buyer-w33" placeholder="Estado" />
        <h2 className="payment-title">Método de Pagamento</h2>
        <div className="payment-methods-types">
          <p className="payment-type-1">Boleto</p>
          <p className="payment-type-2">Cartão de Crédito</p>
        </div>
        <div className="payment-methods-input">
          <label htmlFor="ticket-payment" className="payment-methods">
            <input
              type="radio"
              name="paymentType"
              data-testid="ticket-payment"
              value="Boleto"
              onChange={ handleChange }
              id="ticket-payment"
            />
            <img src={ barCode } alt="boleto" />
          </label>
          <label htmlFor="visa-payment" className="payment-methods">
            <input
              type="radio"
              name="paymentType"
              data-testid="visa-payment"
              value="Visa"
              onChange={ handleChange }
              id="visa-payment"
            />
            <img src={ visa } alt="visa" />
          </label>
          <label htmlFor="master-payment" className="payment-methods">
            <input
              type="radio"
              name="paymentType"
              data-testid="master-payment"
              value="MasterCard"
              onChange={ handleChange }
              id="master-payment"
            />
            <img src={ masterCard } alt="master-card" />
          </label>
          <label htmlFor="elo-payment" className="payment-methods">
            <input
              type="radio"
              name="paymentType"
              data-testid="elo-payment"
              value="Elo"
              onChange={ handleChange }
              id="elo-payment"
            />
            <img src={ elo } alt="elo" />
          </label>
        </div>
        <hr />
        <div className="btn-container">
          <button
            type="button"
            data-testid="checkout-btn"
            onClick={ handleClick }
            className="btn-set-order"
          >
            Comprar
          </button>
        </div>
      </form>
    );
  }
}

BuyerForm.propTypes = {
  error: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default BuyerForm;
