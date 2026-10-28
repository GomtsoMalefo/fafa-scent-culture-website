const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.textContent = open ? '✕' : '☰';
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    if (menuToggle) menuToggle.textContent = '☰';
  });
});

const productCards = [...document.querySelectorAll('.product-card')];
const searchInput = document.getElementById('product-search');
const brandFilter = document.getElementById('brand-filter');
const resultsMessage = document.getElementById('product-results');
const emptyMessage = document.getElementById('empty-products');
const priceFilters = [...document.querySelectorAll('.filter')];
let activePriceFilter = 'all';

const brands = [...new Set(productCards.map(card =>
  card.querySelector('.product-brand').textContent.trim()
))].sort((a, b) => a.localeCompare(b));

brands.forEach(brand => {
  const option = document.createElement('option');
  option.value = brand;
  option.textContent = brand;
  brandFilter.appendChild(option);
});

function filterProducts() {
  const searchTerm = searchInput.value.trim().toLocaleLowerCase();
  const selectedBrand = brandFilter.value;
  let visibleCount = 0;

  productCards.forEach(card => {
    const brand = card.querySelector('.product-brand').textContent.trim();
    const orderButton = card.querySelector('[data-product]');
    const searchableText = `${orderButton.dataset.product} ${card.textContent}`.toLocaleLowerCase();
    const matchesSearch = searchableText.includes(searchTerm);
    const matchesBrand = selectedBrand === 'all' || brand === selectedBrand;
    const matchesPrice = activePriceFilter === 'all' || card.dataset.category === activePriceFilter;
    const visible = matchesSearch && matchesBrand && matchesPrice;

    card.hidden = !visible;
    if (visible) visibleCount++;
  });

  emptyMessage.hidden = visibleCount > 0;
  resultsMessage.textContent = `Showing ${visibleCount} of ${productCards.length} fragrances.`;
}

document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    priceFilters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    activePriceFilter = button.dataset.filter;
    filterProducts();
  });
});

searchInput.addEventListener('input', filterProducts);
brandFilter.addEventListener('change', filterProducts);

function orderProduct(product, price) {
  const priceRequest = price ? `${product} — R${price}.` : `${product}. Please let me know the price.`;
  const message = `Hi FAFA Scent Culture! I'd like to order: ${priceRequest} Please confirm availability and delivery options (PEP PAXI, Bolt Parcel or Uber Parcel).`;
  const url = `https://wa.me/27744884815?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

document.querySelectorAll('[data-product]').forEach(button => {
  button.addEventListener('click', () => orderProduct(button.dataset.product, button.dataset.price));
});

filterProducts();
document.getElementById('year').textContent = new Date().getFullYear();
