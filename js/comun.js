document.addEventListener('click', function (evento) {
  const botonFavorito = evento.target.closest('.boton-favorito');

  if (botonFavorito) {
    const estaMarcado = botonFavorito.textContent.trim() === '❤️';
    botonFavorito.textContent = estaMarcado ? '🤍' : '❤️';
  }

  const botonAgregar = evento.target.closest('.boton-agregar');

  if (botonAgregar) {
    const textoOriginal = botonAgregar.dataset.textoOriginal || '+ AGREGAR';
    botonAgregar.dataset.textoOriginal = textoOriginal;
    botonAgregar.textContent = '✓ AGREGADO';
    botonAgregar.classList.add('agregado');

    window.setTimeout(function () {
      botonAgregar.textContent = textoOriginal;
      botonAgregar.classList.remove('agregado');
    }, 1500);
  }
});
