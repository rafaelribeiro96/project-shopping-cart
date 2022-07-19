require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
it('Teste 1', () => {
  expect(typeof(fetchProducts)).toEqual('function');
})

it('Teste 2', async () => {
  await fetchProducts('computador');
  expect(fetch).toHaveBeenCalled();
})

it('Teste 3', async () => {
  await fetchProducts('computador');
  expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
})

it('Teste 4', async () => {
  expect(await fetchProducts('computador')).toEqual(computadorSearch);
})

it('Teste 5', async () => {
  expect(await fetchProducts()).toEqual(new Error("You must provide an url"));
})

});
