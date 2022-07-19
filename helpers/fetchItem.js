const fetchItem = async (item) => {
  if (!item) {
    return new Error('You must provide an url');
  }
  const urlApi = `https://api.mercadolibre.com/sites/MLB/search?q=${item}`;
  const response = await fetch(urlApi);
  const data = await response.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
