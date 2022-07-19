require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('Teste 1', () => {
    expect(typeof(fetchItem)).toEqual('function');
  })
  
  it('Teste 2', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  })
  
  it('Teste 3', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  })
  
  it('Teste 4', async () => {
    expect(await fetchItem('MLB1615760527')).toEqual(item);
  })
  
  it('Teste 5', async () => {
    expect(await fetchItem()).toEqual(new Error("You must provide an url"));
  })
  
  });