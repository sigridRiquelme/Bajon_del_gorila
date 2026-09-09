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


/* ELEMENTOS DE LA TABLA */

const listaProductos =
    document.getElementById("listaProductos");

const contadorProductos =
    document.getElementById("contadorProductos");


/* ELEMENTOS DEL MODAL */

const modalProducto =
    document.getElementById("modalProducto");

const btnAgregarProducto =
    document.getElementById("btnAgregarProducto");

const cerrarModal =
    document.getElementById("cerrarModal");

const cancelarModal =
    document.getElementById("cancelarModal");

const formProducto =
    document.getElementById("formProducto");


/* CAMPOS DEL FORMULARIO */

const nombreProducto =
    document.getElementById("nombreProducto");

const descripcionProducto =
    document.getElementById("descripcionProducto");

const precioProducto =
    document.getElementById("precioProducto");

const stockProducto =
    document.getElementById("stockProducto");

const categoriaProducto =
    document.getElementById("categoriaProducto");

const estadoProducto =
    document.getElementById("estadoProducto");

const imagenProducto =
    document.getElementById("imagenProducto");


/* FILTROS */

const buscarProducto =
    document.getElementById("buscarProducto");

const filtroCategoria =
    document.getElementById("filtroCategoria");


/* MOSTRAR PRODUCTOS */

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
                    <strong>
                        ${producto.nombre}
                    </strong>
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

                    <select
                        class="estado-producto"
                        onchange="cambiarEstado(${producto.id}, this.value)"
                    >

                        <option
                            value="Disponible"
                            ${producto.estado === "Disponible" ? "selected" : ""}
                        >
                            Disponible
                        </option>

                        <option
                            value="Sin stock"
                            ${producto.estado === "Sin stock" ? "selected" : ""}
                        >
                            Sin stock
                        </option>

                        <option
                            value="Oculto"
                            ${producto.estado === "Oculto" ? "selected" : ""}
                        >
                            Oculto
                        </option>

                    </select>

                </td>

                <td class="acciones">

                    <button
                        class="btn-eliminar"
                        onclick="eliminarProducto(${producto.id})"
                    >
                        ELIMINAR
                    </button>

                </td>

            </tr>
        `;

    });


    contadorProductos.textContent =
        `${lista.length} de ${productos.length} productos`;
}


/* ELIMINAR PRODUCTO */

function eliminarProducto(id) {

    const confirmar =
        confirm(
            "¿Seguro que deseas eliminar este producto?"
        );


    if (!confirmar) {
        return;
    }


    const posicion =
        productos.findIndex(function(producto) {

            return producto.id === id;

        });


    if (posicion !== -1) {

        productos.splice(
            posicion,
            1
        );

        mostrarProductos();

    }
}


/* CAMBIAR ESTADO */

function cambiarEstado(id, nuevoEstado) {

    const producto =
        productos.find(function(producto) {

            return producto.id === id;

        });


    if (producto) {

        producto.estado =
            nuevoEstado;

    }
}


/* MOSTRAR ERROR */

function mostrarError(campo, mensaje) {

    const contenedor =
        campo.closest(".campo-formulario");


    let error =
        contenedor.querySelector(
            ".mensaje-error"
        );


    if (!error) {

        error =
            document.createElement("small");


        error.classList.add(
            "mensaje-error"
        );


        contenedor.appendChild(
            error
        );

    }


    error.textContent =
        mensaje;


    campo.classList.add(
        "campo-error"
    );
}


/* LIMPIAR ERROR */

function limpiarError(campo) {

    const contenedor =
        campo.closest(".campo-formulario");


    if (!contenedor) {
        return;
    }


    const error =
        contenedor.querySelector(
            ".mensaje-error"
        );


    if (error) {

        error.remove();

    }


    campo.classList.remove(
        "campo-error"
    );
}


/* VALIDAR NOMBRE */

function validarNombreProducto() {

    const nombre =
        nombreProducto.value.trim();


    limpiarError(
        nombreProducto
    );


    if (nombre === "") {

        mostrarError(
            nombreProducto,
            "El nombre del producto es obligatorio."
        );

        return false;

    }


    if (
        nombre.length < 3 ||
        nombre.length > 50
    ) {

        mostrarError(
            nombreProducto,
            "Debe ingresar entre 3 y 50 caracteres."
        );

        return false;

    }


    return true;
}


/* VALIDAR DESCRIPCION */

function validarDescripcionProducto() {

    const descripcion =
        descripcionProducto.value.trim();


    limpiarError(
        descripcionProducto
    );


    if (descripcion === "") {

        mostrarError(
            descripcionProducto,
            "La descripción es obligatoria."
        );

        return false;

    }


    if (
        descripcion.length < 10 ||
        descripcion.length > 200
    ) {

        mostrarError(
            descripcionProducto,
            "Debe ingresar entre 10 y 200 caracteres."
        );

        return false;

    }


    return true;
}


/* VALIDAR PRECIO */

function validarPrecioProducto() {

    const valor =
        precioProducto.value.trim();


    limpiarError(
        precioProducto
    );


    if (valor === "") {

        mostrarError(
            precioProducto,
            "El precio es obligatorio."
        );

        return false;

    }


    const precio =
        Number(valor);


    if (
        isNaN(precio) ||
        precio <= 0
    ) {

        mostrarError(
            precioProducto,
            "Debe ingresar un precio mayor a $0."
        );

        return false;

    }


    return true;
}


/* VALIDAR STOCK */

function validarStockProducto() {

    const valor =
        stockProducto.value.trim();


    limpiarError(
        stockProducto
    );


    if (valor === "") {

        mostrarError(
            stockProducto,
            "El stock es obligatorio."
        );

        return false;

    }


    const stock =
        Number(valor);


    if (
        isNaN(stock) ||
        stock < 0 ||
        !Number.isInteger(stock)
    ) {

        mostrarError(
            stockProducto,
            "Debe ingresar un stock válido igual o mayor a 0."
        );

        return false;

    }


    return true;
}


/* VALIDAR CATEGORIA */

function validarCategoriaProducto() {

    limpiarError(
        categoriaProducto
    );


    if (
        categoriaProducto.value === ""
    ) {

        mostrarError(
            categoriaProducto,
            "Debe seleccionar una categoría."
        );

        return false;

    }


    return true;
}


/* VALIDAR ESTADO */

function validarEstadoProducto() {

    limpiarError(
        estadoProducto
    );


    if (
        estadoProducto.value === ""
    ) {

        mostrarError(
            estadoProducto,
            "Debe seleccionar un estado."
        );

        return false;

    }


    return true;
}


/* VALIDAR IMAGEN */

function validarImagenProducto() {

    limpiarError(
        imagenProducto
    );


    const archivo =
        imagenProducto.files[0];


    if (!archivo) {

        mostrarError(
            imagenProducto,
            "Debe seleccionar una imagen."
        );

        return false;

    }


    const tiposPermitidos = [
        "image/png",
        "image/jpeg",
        "image/webp"
    ];


    if (
        !tiposPermitidos.includes(
            archivo.type
        )
    ) {

        mostrarError(
            imagenProducto,
            "La imagen debe ser PNG, JPG o WEBP."
        );

        return false;

    }


    return true;
}


/* VALIDAR FORMULARIO COMPLETO */

function validarFormularioProducto() {

    const nombreValido =
        validarNombreProducto();

    const descripcionValida =
        validarDescripcionProducto();

    const precioValido =
        validarPrecioProducto();

    const stockValido =
        validarStockProducto();

    const categoriaValida =
        validarCategoriaProducto();

    const estadoValido =
        validarEstadoProducto();

    const imagenValida =
        validarImagenProducto();


    return (
        nombreValido &&
        descripcionValida &&
        precioValido &&
        stockValido &&
        categoriaValida &&
        estadoValido &&
        imagenValida
    );
}


/* ABRIR MODAL */

btnAgregarProducto.addEventListener(
    "click",
    function() {

        modalProducto.classList.add(
            "activo"
        );

    }
);


/* CERRAR MODAL */

cerrarModal.addEventListener(
    "click",
    function() {

        modalProducto.classList.remove(
            "activo"
        );

    }
);


/* CANCELAR MODAL */

cancelarModal.addEventListener(
    "click",
    function() {

        modalProducto.classList.remove(
            "activo"
        );


        formProducto.reset();


        limpiarError(
            nombreProducto
        );

        limpiarError(
            descripcionProducto
        );

        limpiarError(
            precioProducto
        );

        limpiarError(
            stockProducto
        );

        limpiarError(
            categoriaProducto
        );

        limpiarError(
            estadoProducto
        );

        limpiarError(
            imagenProducto
        );

    }
);


/* VALIDAR AL SALIR */

nombreProducto.addEventListener(
    "blur",
    validarNombreProducto
);


descripcionProducto.addEventListener(
    "blur",
    validarDescripcionProducto
);


precioProducto.addEventListener(
    "blur",
    validarPrecioProducto
);


stockProducto.addEventListener(
    "blur",
    validarStockProducto
);


categoriaProducto.addEventListener(
    "change",
    validarCategoriaProducto
);


estadoProducto.addEventListener(
    "change",
    validarEstadoProducto
);


imagenProducto.addEventListener(
    "change",
    validarImagenProducto
);


/* LIMPIAR ERROR AL ESCRIBIR */

nombreProducto.addEventListener(
    "input",
    function() {

        limpiarError(
            nombreProducto
        );

    }
);


descripcionProducto.addEventListener(
    "input",
    function() {

        limpiarError(
            descripcionProducto
        );

    }
);


precioProducto.addEventListener(
    "input",
    function() {

        limpiarError(
            precioProducto
        );

    }
);


stockProducto.addEventListener(
    "input",
    function() {

        limpiarError(
            stockProducto
        );

    }
);


/* GUARDAR PRODUCTO */

formProducto.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        if (
            !validarFormularioProducto()
        ) {

            return;

        }


        const archivoImagen =
            imagenProducto.files[0];


        const rutaImagen =
            URL.createObjectURL(
                archivoImagen
            );


        const nuevoProducto = {

            id:
                Date.now(),

            nombre:
                nombreProducto.value.trim(),

            descripcion:
                descripcionProducto.value.trim(),

            categoria:
                categoriaProducto.value,

            precio:
                Number(
                    precioProducto.value
                ),

            stock:
                Number(
                    stockProducto.value
                ),

            estado:
                estadoProducto.value,

            imagen:
                rutaImagen

        };


        productos.push(
            nuevoProducto
        );


        mostrarProductos();


        modalProducto.classList.remove(
            "activo"
        );


        formProducto.reset();

    }
);


/* FILTROS */

function aplicarFiltros() {

    const textoBusqueda =
        buscarProducto.value
            .toLowerCase();


    const categoriaSeleccionada =
        filtroCategoria.value;


    const productosFiltrados =
        productos.filter(
            function(producto) {

                const coincideNombre =
                    producto.nombre
                        .toLowerCase()
                        .includes(
                            textoBusqueda
                        );


                const coincideCategoria =
                    categoriaSeleccionada === "todas" ||
                    producto.categoria
                        .toLowerCase() ===
                    categoriaSeleccionada;


                return (
                    coincideNombre &&
                    coincideCategoria
                );

            }
        );


    mostrarProductos(
        productosFiltrados
    );
}


buscarProducto.addEventListener(
    "input",
    aplicarFiltros
);


filtroCategoria.addEventListener(
    "change",
    aplicarFiltros
);


/* MOSTRAR PRODUCTOS AL CARGAR */

mostrarProductos();