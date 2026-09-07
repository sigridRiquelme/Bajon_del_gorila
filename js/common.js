document.addEventListener('click', function (event) {
  const likeButton = event.target.closest('.like-button');
  if (likeButton) {
    const isLiked = likeButton.textContent.trim() === '❤️';
    likeButton.textContent = isLiked ? '🤍' : '❤️';
  }

  const addButton = event.target.closest('.add-button');
  if (addButton) {
    const originalText = addButton.dataset.originalText || '+ AGREGAR';
    addButton.dataset.originalText = originalText;
    addButton.textContent = '✓ AGREGADO';
    addButton.classList.add('added');

    window.setTimeout(function () {
      addButton.textContent = originalText;
      addButton.classList.remove('added');
    }, 1500);
  }
});
