import React from 'react';
import { getProductsFromCategoryAndQuery, getCategories } from '../services/api';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import '../style/home.css';
import lupa from '../img/search.png';

class Home extends React.Component {
  state = {
    data: [],
    searchInput: '',
    resulSearch: [],
    searchSucess: true,
    initial: true,
    click: '',
  };

  componentDidMount() {
    this.fetchCategories();
  }

  handleSearch = ({ target }) => {
    const { value } = target;
    this.setState({ searchInput: value });
  };

  fetchSearch = async (category) => {
    const { searchInput } = this.state;
    const categoryType = typeof category;
    let products;
    if (categoryType !== 'string') {
      products = await getProductsFromCategoryAndQuery('', searchInput);
    } else {
      products = await getProductsFromCategoryAndQuery(category, '');
    }
    this.setState({
      resulSearch: products.results,
      searchSucess: true,
      initial: false,
    });
    if (products.results.length === 0) {
      this.setState({ searchSucess: false });
    }
  };

  fetchCategories = async () => {
    const data = await getCategories();
    this.setState({
      data,
    });
  };

  toForceUpdate = () => {
    this.setState({ click: 'clicou' });
  };

  render() {
    const { data, resulSearch, searchSucess, initial, click } = this.state;
    return (
      <div>
        <Header />
        <main>
          <div className="input-de-busca-div">
            <input
              type="text"
              placeholder="Buscar Produto"
              data-testid="query-input"
              onChange={ this.handleSearch }
              className="input-de-busca"
            />
            <button
              type="button"
              data-testid="query-button"
              onClick={ this.fetchSearch }
              className="search-btn"
            >
              <img src={ lupa } alt="lupa de busca" />
            </button>
          </div>

          <section className="card-item">
            {
              !searchSucess
                ? <h1 className="initial-message">Nenhum produto foi encontrado</h1>
                : (
                  resulSearch.map((element) => (
                    <ProductCard
                      key={ element.id }
                      name={ element.title }
                      image={ element.thumbnail }
                      price={ element.price }
                      id={ element.id }
                      toForceUpdate={ this.toForceUpdate }
                    />
                  ))
                )
            }
          </section>
          <section className="categorys">
            <h2>Categorias</h2>
            <hr />
            {
              data.map((category) => (
                <button
                  type="button"
                  data-testid="category"
                  key={ category.id }
                  onClick={ () => this.fetchSearch(category.id) }
                  className="btn-category"
                >
                  {` ${category.name}`}
                </button>
              ))
            }
          </section>
          { initial && (
            <h1 data-testid="home-initial-message" className="initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </h1>)}
          <p className="hide">{ click }</p>
        </main>
      </div>
    );
  }
}

export default Home;
