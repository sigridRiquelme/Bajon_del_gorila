const buscador = document.getElementById('buscador');
const selectorOrden = document.getElementById('selectorOrden');
const botonesFiltro = document.querySelectorAll('.boton-filtro');
const grillaProductos = document.getElementById('grillaProductos');
const tarjetasProducto = Array.from(document.querySelectorAll('.tarjeta-producto'));
const cantidadResultados = document.getElementById('cantidadResultados');
const categoriaResultado = document.getElementById('categoriaResultado');
const estadoVacio = document.getElementById('estadoVacio');

let categoriaActiva = 'Todos';

function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function actualizarMenu() {
  const textoBusqueda = normalizarTexto(buscador.value.trim());

  const tarjetasVisibles = tarjetasProducto.filter(function (tarjeta) {
    const categoria = tarjeta.dataset.categoria;
    const textoBuscable = normalizarTexto(tarjeta.textContent);

    const coincideCategoria = categoriaActiva === 'Todos' || categoria === categoriaActiva;
    const coincideBusqueda = textoBuscable.includes(textoBusqueda);

    return coincideCategoria && coincideBusqueda;
  });

  tarjetasProducto.forEach(function (tarjeta) {
    tarjeta.style.display = tarjetasVisibles.includes(tarjeta) ? 'flex' : 'none';
  });

  const tipoOrden = selectorOrden.value;

  tarjetasVisibles.sort(function (tarjetaA, tarjetaB) {
    const precioA = Number(tarjetaA.dataset.precio);
    const precioB = Number(tarjetaB.dataset.precio);
    const valoracionA = Number(tarjetaA.dataset.valoracion);
    const valoracionB = Number(tarjetaB.dataset.valoracion);

    if (tipoOrden === 'Menor precio') {
      return precioA - precioB;
    }

    if (tipoOrden === 'Mayor precio') {
      return precioB - precioA;
    }

    return valoracionB - valoracionA;
  });

  tarjetasVisibles.forEach(function (tarjeta) {
    grillaProductos.appendChild(tarjeta);
  });

  cantidadResultados.textContent = tarjetasVisibles.length;
  categoriaResultado.textContent = categoriaActiva === 'Todos' ? '' : ' en ' + categoriaActiva;
  estadoVacio.classList.toggle('mostrar', tarjetasVisibles.length === 0);
}

botonesFiltro.forEach(function (boton) {
  boton.addEventListener('click', function () {
    botonesFiltro.forEach(function (otroBoton) {
      otroBoton.classList.remove('activo');
    });

    boton.classList.add('activo');
    categoriaActiva = boton.dataset.categoria;
    actualizarMenu();
  });
});

buscador.addEventListener('input', actualizarMenu);
selectorOrden.addEventListener('change', actualizarMenu);

actualizarMenu();
