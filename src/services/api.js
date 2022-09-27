export async function getCategories() {
  const ENDPOINT = 'https://api.mercadolibre.com/sites/MLB/categories';
  const data = await (await fetch(ENDPOINT)).json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  let ENDPOINT;
  if (categoryId === '') {
    ENDPOINT = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  } else {
    ENDPOINT = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  }
  const data = await (await fetch(ENDPOINT)).json();
  return data;
}

export async function getProductById(id) {
  if (id) {
    const url = `https://api.mercadolibre.com/items/${id}`;
    const request = await fetch(url);
    const response = await request.json();
    return response;
  }
}
