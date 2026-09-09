const formularioAlertas = document.getElementById('formularioAlertas');
const correoAlertas = document.getElementById('correoAlertas');
const mensajeAlertas = document.getElementById('mensajeAlertas');

formularioAlertas.addEventListener('submit', function (evento) {
  evento.preventDefault();

  if (!correoAlertas.value.trim()) {
    mensajeAlertas.textContent = 'Ingresa un correo válido.';
    return;
  }

  mensajeAlertas.textContent = '¡Listo! Te avisaremos de las próximas promos.';
  correoAlertas.value = '';
});
