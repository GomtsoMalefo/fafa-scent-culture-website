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

document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const selected = button.dataset.filter;
    document.querySelectorAll('.product-card').forEach(card => {
      card.hidden = selected !== 'all' && card.dataset.category !== selected;
    });
  });
});

function orderProduct(product, price) {
  const priceRequest = price ? `${product} — R${price}.` : `${product}. Please let me know the price.`;
  const message = `Hi FAFA Scent Culture! I'd like to order: ${priceRequest} Please confirm availability and delivery options (PEP PAXI, Bolt Parcel or Uber Parcel).`;
  const url = `https://wa.me/27744884815?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

document.querySelectorAll('[data-product]').forEach(button => {
  button.addEventListener('click', () => orderProduct(button.dataset.product, button.dataset.price));
});

document.getElementById('year').textContent = new Date().getFullYear();
