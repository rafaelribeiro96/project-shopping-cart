const cartItems = '.cart__items';

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image, salePrice }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createCustomElement('span', 'item__price', salePrice
  .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const priceUpdate = () => {
  const items = document.querySelectorAll('.cart__item');
  let priceItem = 0;
  items.forEach((item) => {
    const price = item.innerText.split('$');
    const value = Number(price[1]);
    priceItem += value;
  });
  /* document.querySelector('.total-price').innerHTML = `${priceItem}`; */
  document.querySelector('.total-price').innerHTML = `Valor Total: ${priceItem
    .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
};

const cartItemClickListener = (event) => {
  if (event.target.tagName !== 'IMG' || event.target.tagName === 'P') {
    event.target.remove();
    priceUpdate();
  const productsCart = document.querySelector(cartItems);
  saveCartItems('cartItems', productsCart.innerHTML);
  }
  if (event.target.tagName === 'IMG' || event.target.tagName === 'P') {
    event.target.parentElement.remove();
    priceUpdate();
  const productsCart = document.querySelector(cartItems);
  saveCartItems('cartItems', productsCart.innerHTML);
  }
};

const createCartItemElement = ({ name, salePrice, image }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerHTML = `<img class="cart__image" src="${image}">
  ${name} <br><br>
  R$${salePrice.toFixed(2)}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const shopCart = document.querySelector(cartItems);

const load = () => {
  const loading = document.createElement('p');
  loading.classList.add('loading');
  loading.innerText = 'carregando...';
  shopCart.appendChild(loading);
};

const removeLoad = () => {
  removeLoading = document.querySelector('.loading');
  removeLoading.remove();
};

const loadProduct = async (product = 'computador') => {
  load();
  const { results } = await fetchProducts(product);
  removeLoad();
  const itens = document.querySelector('.items');
  results.forEach(({ id: sku, title: name, price: salePrice, thumbnail: image }) => {
  itens.appendChild(createProductItemElement({ sku, name, salePrice, image }));
  });
  };

const loadItensCart = async (item) => {
  const idItem = getSkuFromProductItem(item.target.parentNode);
  load();
  console.log('loadItensCart');
  const { id: sku, title: name, price: salePrice, thumbnail: image } = await fetchItem(idItem);
  removeLoad();
  const product = createCartItemElement({ sku, name, salePrice, image });
  shopCart.appendChild(product);
  saveCartItems(document.querySelector(cartItems).innerHTML);
  priceUpdate();
};

const addProductCart = () => {
  const require = document.querySelectorAll('.item__add');
  require.forEach((product) => {
    product.addEventListener('click', loadItensCart);
    console.log('addProductCart');
  });
};

const clearCart = () => {
  const productsCartList = document.querySelector('ol');
  while (productsCartList.firstChild) { productsCartList.removeChild(productsCartList.lastChild); }
  document.querySelector('.total-price').innerHTML = 0;
};

document.querySelector('.empty-cart').addEventListener('click', clearCart);

const getSavedCart = () => {
  getSavedCartItems();
  document.querySelectorAll('.cart__item')
  .forEach((product) => product.addEventListener('click', cartItemClickListener));
};

const removeItems = () => {
  const items = document.querySelectorAll('.item');
  items.forEach((item) => {
    item.remove();
  });
};

const searchItems = async () => {
  const searchInput = document.querySelector('#search__input');
  if (searchInput.value.length > 1) {
    removeItems();
    await loadProduct(searchInput.value);
    await addProductCart();
  }
};

const searchProducts = () => {
  const searchInput = document.querySelector('#search__input');
  const searchIcon = document.querySelector('#search__button');
  searchIcon.addEventListener('click', searchItems);
  searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      searchItems();
    }
  });
};

const searchItemsList = async (productClick) => {
  const searchInput = await productClick;
    removeItems();
    await loadProduct(searchInput);
    await addProductCart();
};

const searchByList = async () => {
const searchInList = document.querySelector('#search__list');
  searchInList.addEventListener('click', (event) => {
    const productClick = (event.target.innerText);
    console.log(productClick);
    searchItemsList(productClick);
  });
};

window.onload = async () => { 
  getSavedCart();
  await loadProduct();
  addProductCart();
  searchItemsList();
  searchItems();
  searchProducts();
  searchByList();
  priceUpdate();
};
