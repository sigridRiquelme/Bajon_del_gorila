const carrito = [
    {
        id: 1,
        nombre: "Hamburguesa Gorila",
        precio: 8990,
        cantidad: 1,
        imagen: "../img/gorila-burger.png"
    }
];


const listaCarrito = document.getElementById("listaCarrito");
const contadorCarrito = document.getElementById("contadorCarrito");

const subtotal = document.getElementById("subtotal");
const totalPedido = document.getElementById("totalPedido");


function mostrarCarrito() {

    listaCarrito.innerHTML = "";


    carrito.forEach(function(producto) {

        listaCarrito.innerHTML += `
            <div class="producto-carrito">

                <img
                    src="${producto.imagen}"
                    alt="${producto.nombre}"
                    class="imagen-carrito"
                >


                <div class="info-producto-carrito">

                    <h3>
                        ${producto.nombre}
                    </h3>

                    <p class="precio-carrito">
                        $${producto.precio.toLocaleString("es-CL")}
                    </p>


                    <div class="cantidad-producto">

                        <button onclick="disminuirCantidad(${producto.id})">
                            -
                        </button>

                        <span>
                            ${producto.cantidad}
                        </span>

                        <button onclick="aumentarCantidad(${producto.id})">
                            +
                        </button>

                    </div>

                </div>


                <button
                    class="btn-eliminar-carrito"
                    onclick="eliminarDelCarrito(${producto.id})"
                >
                    ELIMINAR
                </button>

            </div>
        `;

    });


    actualizarResumen();
}


function actualizarResumen() {

    let totalProductos = 0;
    let subtotalCarrito = 0;


    carrito.forEach(function(producto) {

        totalProductos += producto.cantidad;

        subtotalCarrito +=
            producto.precio * producto.cantidad;
    });


    contadorCarrito.textContent =
    totalProductos === 1
        ? "1 producto"
        : `${totalProductos} productos`;


    subtotal.textContent =
        `$${subtotalCarrito.toLocaleString("es-CL")}`;


    totalPedido.textContent =
        `$${subtotalCarrito.toLocaleString("es-CL")}`;
}


function aumentarCantidad(id) {

    const producto = carrito.find(function(producto) {
        return producto.id === id;
    });


    if (producto) {

        producto.cantidad++;

        mostrarCarrito();
    }
}


function disminuirCantidad(id) {

    const producto = carrito.find(function(producto) {
        return producto.id === id;
    });


    if (producto && producto.cantidad > 1) {

        producto.cantidad--;

        mostrarCarrito();
    }
}


function eliminarDelCarrito(id) {

    const posicion = carrito.findIndex(function(producto) {
        return producto.id === id;
    });


    if (posicion !== -1) {

        carrito.splice(posicion, 1);

        mostrarCarrito();
    }
}


mostrarCarrito();