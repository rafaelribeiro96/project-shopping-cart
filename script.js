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

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  event.target.remove();
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const shopCart = document.querySelector('.cart__items');

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
  results.forEach(({ id: sku, title: name, thumbnail: image }) => {
  itens.appendChild(createProductItemElement({ sku, name, image }));
  });
  };

const loadItensCart = async (item) => {
  const idItem = getSkuFromProductItem(item.target.parentNode);
  load();
  const { id: sku, title: name, price: salePrice } = await fetchItem(idItem);
  removeLoad();
  const product = createCartItemElement({ sku, name, salePrice });
  shopCart.appendChild(product);
  saveCartItems(document.querySelector('.cart__items').innerHTML);
};

const addProductCart = () => {
  const require = document.querySelectorAll('.item__add');
  require.forEach((product) => {
    product.addEventListener('click', loadItensCart);
  });
};

const clearCart = () => {
  const productsCartList = document.querySelector('ol');
  while (productsCartList.firstChild) { productsCartList.removeChild(productsCartList.lastChild); }
};

document.querySelector('.empty-cart').addEventListener('click', clearCart);

const getSavedCart = () => {
  getSavedCartItems();
  document.querySelectorAll('.cart__item')
  .forEach((product) => product.addEventListener('click', cartItemClickListener));
};

window.onload = async () => { 
  getSavedCart();
  await loadProduct();
  addProductCart();
};
