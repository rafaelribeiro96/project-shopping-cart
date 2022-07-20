const getSavedCartItems = () => {
  const items = localStorage.getItem('cartItems');
  if (items) document.querySelector('.cart__items').innerHTML = items;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
