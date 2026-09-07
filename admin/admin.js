const productos = [
    {
        id: 1,
        nombre: "Hamburguesa Gorila",
        categoria: "Hamburguesas",
        precio: 8990,
        stock: 15,
        estado: "Disponible",
        imagen: "../img/gorila-burger.png"
    }
];

const listaProductos = document.getElementById("listaProductos");
const contadorProductos = document.getElementById("contadorProductos");
const modalProducto = document.getElementById("modalProducto");
const btnAgregarProducto = document.getElementById("btnAgregarProducto");
const cerrarModal = document.getElementById("cerrarModal");
const cancelarModal = document.getElementById("cancelarModal");

const formProducto = document.getElementById("formProducto");

const nombreProducto = document.getElementById("nombreProducto");
const descripcionProducto = document.getElementById("descripcionProducto");
const precioProducto = document.getElementById("precioProducto");
const stockProducto = document.getElementById("stockProducto");
const categoriaProducto = document.getElementById("categoriaProducto");
const estadoProducto = document.getElementById("estadoProducto");
const imagenProducto = document.getElementById("imagenProducto");

const buscarProducto = document.getElementById("buscarProducto");
const filtroCategoria = document.getElementById("filtroCategoria");

function mostrarProductos(lista = productos) {

    listaProductos.innerHTML = "";

    lista.forEach(function(producto) {

        listaProductos.innerHTML += `
            <tr>

                <td>
                    <img
                        src="${producto.imagen}"
                        alt="${producto.nombre}"
                        class="imagen-producto"
                    >
                </td>

                <td>
                    <strong>${producto.nombre}</strong>
                </td>

                <td>
                    ${producto.categoria}
                </td>

                <td class="precio">
                    $${producto.precio.toLocaleString("es-CL")}
                </td>

                <td>
                    <span class="stock-disponible">
                        ${producto.stock}
                    </span>

                    <span class="unidad-stock">
                        un.
                    </span>
                </td>

                <td>
                    <select class="estado-producto">
                        <option value="Disponible"
                            ${producto.estado === "Disponible" ? "selected" : ""}>
                            Disponible
                        </option>

                        <option value="Sin stock"
                            ${producto.estado === "Sin stock" ? "selected" : ""}>
                            Sin stock
                        </option>

                        <option value="Oculto"
                            ${producto.estado === "Oculto" ? "selected" : ""}>
                            Oculto
                        </option>
                    </select>
                </td>

                <td class="acciones">

                    <button class="btn-editar">
                        EDITAR
                    </button>

                    <button class="btn-eliminar">
                        ELIMINAR
                    </button>

                </td>

            </tr>
        `;

    });

    contadorProductos.textContent =
        `${lista.length} de ${productos.length} productos`;
}


mostrarProductos();

btnAgregarProducto.addEventListener("click", function() {
    modalProducto.classList.add("activo");
});

cerrarModal.addEventListener("click", function() {
    modalProducto.classList.remove("activo");
});

cancelarModal.addEventListener("click", function() {
    modalProducto.classList.remove("activo");
});

formProducto.addEventListener("submit", function(event) {

    event.preventDefault();

    const nombre = nombreProducto.value.trim();
    const descripcion = descripcionProducto.value.trim();
    const precio = Number(precioProducto.value);
    const stock = Number(stockProducto.value);


    const archivoImagen = imagenProducto.files[0];


    if (archivoImagen) {
        rutaImagen = URL.createObjectURL(archivoImagen);
    }

    const nuevoProducto = {
        id: Date.now(),
        nombre: nombreProducto.value,
        descripcion: descripcionProducto.value,
        categoria: categoriaProducto.value,
        precio: Number(precioProducto.value),
        stock: Number(stockProducto.value),
        estado: estadoProducto.value,
        imagen: rutaImagen
    };

    productos.push(nuevoProducto);

    mostrarProductos();

    modalProducto.classList.remove("activo");

    formProducto.reset();
});

function aplicarFiltros() {

    const textoBusqueda = buscarProducto.value.toLowerCase();
    const categoriaSeleccionada = filtroCategoria.value;

    const productosFiltrados = productos.filter(function(producto) {

        const coincideNombre = producto.nombre
            .toLowerCase()
            .includes(textoBusqueda);

        const coincideCategoria =
            categoriaSeleccionada === "todas" ||
            producto.categoria.toLowerCase() === categoriaSeleccionada;

        return coincideNombre && coincideCategoria;
    });

    mostrarProductos(productosFiltrados);
}

buscarProducto.addEventListener("input", aplicarFiltros);
filtroCategoria.addEventListener("change", aplicarFiltros);