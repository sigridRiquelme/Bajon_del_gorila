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


function mostrarProductos() {

    listaProductos.innerHTML = "";

    productos.forEach(function(producto) {

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
                    <select class="estado-producto disponible">
                        <option>Disponible</option>
                        <option>Sin stock</option>
                        <option>Oculto</option>
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
        `${productos.length} de ${productos.length} productos`;
}


mostrarProductos();