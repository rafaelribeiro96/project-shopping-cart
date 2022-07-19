const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('Teste 1', async () => {
    await getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  })
  
  it('Teste 2', async () => {
    await getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  })
});
