import React from 'react';
import PropTypes from 'prop-types';
// import ratingStar from '../img/start-rating.png';
import '../style/AvaliationForm.css';

class AvaliationForm extends React.Component {
  state = {
    inputEmail: '',
    inputRating: '',
    textarea: '',
    avaliations: [],
    error: false,
    existAvaliation: false,
  };

  componentDidMount() {
    this.readAvaliations();
  }

  saveAvaliation = (id, value) => localStorage.setItem(id, JSON.stringify(value));

  readExistAvaliations = (key) => JSON.parse(localStorage.getItem(key));

  readAvaliations = () => {
    const { id } = this.props;
    if (this.readExistAvaliations(id) !== null) {
      this.setState({
        avaliations: this.readExistAvaliations(id),
        existAvaliation: true });
    }
  };

  handleClick = () => {
    const { inputEmail, inputRating, textarea } = this.state;
    const { id } = this.props;
    const verifyEmail = /\S+@\S+\.\S+/;
    if (inputRating.length === 0
      || !inputEmail.match(verifyEmail)) {
      this.setState({ error: true });
    } else {
      const userAvaliation = {
        email: inputEmail,
        text: textarea,
        rating: inputRating,
      };
      this.setState(
        (prevState) => ({
          inputEmail: '',
          inputRating: '',
          textarea: '',
          error: false,
          avaliations: [...prevState.avaliations, userAvaliation],
        }),
        () => {
          const { avaliations } = this.state;
          this.saveAvaliation(id, avaliations);
          this.readAvaliations();
        },
      );
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { inputEmail, textarea, error, avaliations, existAvaliation } = this.state;
    return (
      <section className="product-avaliations">
        <div className="form-avaliaton-container">
          <h2>Avaliações</h2>
          <form action="" className="form-avaliaton">
            { error && <p data-testid="error-msg">Campos inválidos</p>}
            <div>
              <input
                name="inputEmail"
                value={ inputEmail }
                onChange={ this.handleChange }
                data-testid="product-detail-email"
                id="input-email"
                className="input-email"
                type="text"
                placeholder="Email"
              />
              <input
                type="radio"
                value="1"
                onChange={ this.handleChange }
                name="inputRating"
                id="inputRating-1"
                data-testid="1-rating"
              />
              <input
                type="radio"
                value="2"
                onChange={ this.handleChange }
                name="inputRating"
                data-testid="2-rating"
              />
              <input
                type="radio"
                value="3"
                onChange={ this.handleChange }
                name="inputRating"
                data-testid="3-rating"
              />
              <input
                type="radio"
                value="4"
                onChange={ this.handleChange }
                name="inputRating"
                data-testid="4-rating"
              />
              <input
                type="radio"
                value="5"
                onChange={ this.handleChange }
                name="inputRating"
                data-testid="5-rating"
              />
            </div>
            <div className="">
              <textarea
                name="textarea"
                value={ textarea }
                onChange={ this.handleChange }
                data-testid="product-detail-evaluation"
                cols="30"
                rows="10"
                placeholder="Mensagem (opcional)"
              />
            </div>
            <button
              data-testid="submit-review-btn"
              type="button"
              onClick={ this.handleClick }
              className="btn-set-avaliation"
            >
              Avaliar
            </button>
          </form>
        </div>
        { existAvaliation && (
          avaliations.map((avaliation) => (
            <section
              className="avaliations"
              key={ `${avaliation.email} ${avaliation.rating}` }
            >
              <div className="avaliation-email-rating">
                <h3 data-testid="review-card-email">{ avaliation.email }</h3>
                <span data-testid="review-card-rating">
                  {` Avaliação: ${avaliation.rating}` }
                </span>
              </div>
              <p data-testid="review-card-evaluation">
                { avaliation.text }
              </p>
            </section>))
        ) }
      </section>
    );
  }
}

AvaliationForm.propTypes = {
  id: PropTypes.string.isRequired,
};

export default AvaliationForm;
