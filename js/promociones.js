const newsletterForm = document.getElementById('newsletterForm');
const newsletterEmail = document.getElementById('newsletterEmail');
const newsletterMessage = document.getElementById('newsletterMessage');

newsletterForm.addEventListener('submit', function (event) {
  event.preventDefault();

  if (!newsletterEmail.value.trim()) {
    newsletterMessage.textContent = 'Ingresa un correo válido.';
    return;
  }

  newsletterMessage.textContent = '¡Listo! Te avisaremos de las próximas promos.';
  newsletterEmail.value = '';
});
