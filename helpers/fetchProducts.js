const fetchProducts = async (produto) => {
  if (!produto) {
    return new Error('You must provide an url');
  }
  const urlApi = `https://api.mercadolibre.com/sites/MLB/search?q=${produto}`;
  const response = await fetch(urlApi);
  const data = await response.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
