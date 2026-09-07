const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const filterButtons = document.querySelectorAll('.filter-button');
const productsGrid = document.getElementById('productsGrid');
const productCards = Array.from(document.querySelectorAll('.product-card'));
const resultCount = document.getElementById('resultCount');
const categoryResult = document.getElementById('categoryResult');
const emptyState = document.getElementById('emptyState');

let activeCategory = 'Todos';

function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function updateMenu() {
  const searchText = normalizeText(searchInput.value.trim());

  const visibleCards = productCards.filter(function (card) {
    const category = card.dataset.category;
    const searchableText = normalizeText(card.textContent);

    const categoryMatches = activeCategory === 'Todos' || category === activeCategory;
    const searchMatches = searchableText.includes(searchText);

    return categoryMatches && searchMatches;
  });

  productCards.forEach(function (card) {
    card.style.display = visibleCards.includes(card) ? 'flex' : 'none';
  });

  const sortType = sortSelect.value;

  visibleCards.sort(function (cardA, cardB) {
    const priceA = Number(cardA.dataset.price);
    const priceB = Number(cardB.dataset.price);
    const ratingA = Number(cardA.dataset.rating);
    const ratingB = Number(cardB.dataset.rating);

    if (sortType === 'Menor precio') {
      return priceA - priceB;
    }

    if (sortType === 'Mayor precio') {
      return priceB - priceA;
    }

    return ratingB - ratingA;
  });

  visibleCards.forEach(function (card) {
    productsGrid.appendChild(card);
  });

  resultCount.textContent = visibleCards.length;
  categoryResult.textContent = activeCategory === 'Todos' ? '' : ' en ' + activeCategory;
  emptyState.classList.toggle('show', visibleCards.length === 0);
}

filterButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    filterButtons.forEach(function (otherButton) {
      otherButton.classList.remove('active');
    });

    button.classList.add('active');
    activeCategory = button.dataset.category;
    updateMenu();
  });
});

searchInput.addEventListener('input', updateMenu);
sortSelect.addEventListener('change', updateMenu);

updateMenu();
