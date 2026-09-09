document.addEventListener("DOMContentLoaded", function() {

    /* CAMPOS DEL FORMULARIO */

    const formEntrega =
        document.getElementById("formEntrega");

    const nombreCliente =
        document.getElementById("nombreCliente");

    const apellidoCliente =
        document.getElementById("apellidoCliente");

    const telefonoCliente =
        document.getElementById("telefonoCliente");

    const correoCliente =
        document.getElementById("correoCliente");

    const direccionCliente =
        document.getElementById("direccionCliente");

    const comunaCliente =
        document.getElementById("comunaCliente");

    const referenciaCliente =
        document.getElementById("referenciaCliente");


    /* BOTONES DE ENTREGA */

    const btnDelivery =
        document.getElementById("btnDelivery");

    const btnRetiro =
        document.getElementById("btnRetiro");


    /* CONTENEDORES DE DIRECCION */

    const contenedorDireccion =
        document.getElementById("contenedorDireccion");

    const contenedorComuna =
        document.getElementById("contenedorComuna");

    const contenedorReferencia =
        document.getElementById("contenedorReferencia");


    /* BOTONES DE PAGO */

    const pagoTarjeta =
        document.getElementById("pagoTarjeta");

    const pagoEfectivo =
        document.getElementById("pagoEfectivo");


    /* RESUMEN */

    const subtotalEntrega =
        document.getElementById("subtotalEntrega");

    const costoDelivery =
        document.getElementById("costoDelivery");

    const totalEntrega =
        document.getElementById("totalEntrega");

    const contadorHeader =
        document.getElementById("contadorHeader");

    const productosResumen =
        document.querySelector(".productos-resumen");


    /* CARRITO GUARDADO */

    const carritoGuardado =
        JSON.parse(
            sessionStorage.getItem("carrito")
        ) || [];


    /* VALORES INICIALES */

    const valorDelivery = 2000;

    let tipoEntrega = "delivery";

    let metodoPago = "tarjeta";

    let subtotal = 0;


    /* CALCULAR SUBTOTAL */

    carritoGuardado.forEach(function(producto) {

        subtotal +=
            producto.precio * producto.cantidad;

    });


    /*
        Si todavía estás probando la página
        directamente sin venir desde carrito,
        dejamos el producto de ejemplo.
    */

    if (carritoGuardado.length === 0) {

        subtotal = 8990;

    }


    /* MOSTRAR PRODUCTOS DEL CARRITO */

    if (
        carritoGuardado.length > 0 &&
        productosResumen
    ) {

        productosResumen.innerHTML = "";


        carritoGuardado.forEach(function(producto) {

            const totalProducto =
                producto.precio * producto.cantidad;


            productosResumen.innerHTML += `
                <div class="producto-resumen">

                    <span>
                        ${producto.nombre}
                        ×${producto.cantidad}
                    </span>

                    <strong>
                        $${totalProducto.toLocaleString("es-CL")}
                    </strong>

                </div>
            `;

        });

    }


    /* CONTADOR DEL HEADER */

    if (contadorHeader) {

        let cantidadTotal = 0;


        carritoGuardado.forEach(function(producto) {

            cantidadTotal += producto.cantidad;

        });


        contadorHeader.textContent =
            cantidadTotal;

    }


    /* MOSTRAR RESUMEN */

    function actualizarResumen() {

        let costo = 0;


        if (tipoEntrega === "delivery") {

            costo = valorDelivery;

        }


        const total =
            subtotal + costo;


        subtotalEntrega.textContent =
            `$${subtotal.toLocaleString("es-CL")}`;


        costoDelivery.textContent =
            `$${costo.toLocaleString("es-CL")}`;


        totalEntrega.textContent =
            `$${total.toLocaleString("es-CL")}`;

    }


    /* SELECCIONAR DELIVERY */

    function seleccionarDelivery() {

        tipoEntrega = "delivery";


        btnDelivery.classList.add("activa");

        btnRetiro.classList.remove("activa");


        btnDelivery.setAttribute(
            "aria-pressed",
            "true"
        );

        btnRetiro.setAttribute(
            "aria-pressed",
            "false"
        );


        contenedorDireccion.style.display =
            "flex";

        contenedorComuna.style.display =
            "flex";

        contenedorReferencia.style.display =
            "flex";


        actualizarResumen();

    }


    /* SELECCIONAR RETIRO */

    function seleccionarRetiro() {

        tipoEntrega = "retiro";


        btnRetiro.classList.add("activa");

        btnDelivery.classList.remove("activa");


        btnRetiro.setAttribute(
            "aria-pressed",
            "true"
        );

        btnDelivery.setAttribute(
            "aria-pressed",
            "false"
        );


        contenedorDireccion.style.display =
            "none";

        contenedorComuna.style.display =
            "none";

        contenedorReferencia.style.display =
            "none";


        limpiarError(direccionCliente);

        limpiarError(comunaCliente);


        actualizarResumen();

    }


    /* SELECCIONAR TARJETA */

    function seleccionarTarjeta() {

        metodoPago = "tarjeta";


        pagoTarjeta.classList.add("activa");

        pagoEfectivo.classList.remove("activa");


        pagoTarjeta.setAttribute(
            "aria-pressed",
            "true"
        );

        pagoEfectivo.setAttribute(
            "aria-pressed",
            "false"
        );

    }


    /* SELECCIONAR EFECTIVO */

    function seleccionarEfectivo() {

        metodoPago = "efectivo";


        pagoEfectivo.classList.add("activa");

        pagoTarjeta.classList.remove("activa");


        pagoEfectivo.setAttribute(
            "aria-pressed",
            "true"
        );

        pagoTarjeta.setAttribute(
            "aria-pressed",
            "false"
        );

    }


    /* EVENTOS DE BOTONES */

    btnDelivery.addEventListener(
        "click",
        seleccionarDelivery
    );


    btnRetiro.addEventListener(
        "click",
        seleccionarRetiro
    );


    pagoTarjeta.addEventListener(
        "click",
        seleccionarTarjeta
    );


    pagoEfectivo.addEventListener(
        "click",
        seleccionarEfectivo
    );


    /* MOSTRAR ERROR */

    function mostrarError(campo, mensaje) {

        const contenedor =
            campo.closest(".campo-formulario");


        let mensajeError =
            contenedor.querySelector(
                ".mensaje-error"
            );


        if (!mensajeError) {

            mensajeError =
                document.createElement("small");


            mensajeError.classList.add(
                "mensaje-error"
            );


            contenedor.appendChild(
                mensajeError
            );

        }


        mensajeError.textContent =
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


        const mensajeError =
            contenedor.querySelector(
                ".mensaje-error"
            );


        if (mensajeError) {

            mensajeError.remove();

        }


        campo.classList.remove(
            "campo-error"
        );

    }


    /* VALIDAR NOMBRE */

    function validarNombre() {

        const nombre =
            nombreCliente.value.trim();


        limpiarError(nombreCliente);


        if (
            nombre.length < 3 ||
            nombre.length > 50
        ) {

            mostrarError(
                nombreCliente,
                "Debe ingresar entre 3 y 50 caracteres."
            );

            return false;

        }


        return true;

    }


    /* VALIDAR APELLIDO */

    function validarApellido() {

        const apellido =
            apellidoCliente.value.trim();


        limpiarError(apellidoCliente);


        if (
            apellido.length < 3 ||
            apellido.length > 50
        ) {

            mostrarError(
                apellidoCliente,
                "Debe ingresar entre 3 y 50 caracteres."
            );

            return false;

        }


        return true;

    }


    /* VALIDAR TELEFONO */

    function validarTelefono() {

        const telefono =
            telefonoCliente.value
                .replace(/\s/g, "");


        limpiarError(telefonoCliente);


        const formatoTelefono =
            /^\+569\d{8}$/;


        if (
            !formatoTelefono.test(telefono)
        ) {

            mostrarError(
                telefonoCliente,
                "Debe ingresar un teléfono válido en formato +56912345678."
            );

            return false;

        }


        telefonoCliente.value =
            telefono;


        return true;

    }


    /* VALIDAR CORREO */

    function validarCorreo() {

        const correo =
            correoCliente.value
                .trim()
                .toLowerCase();


        limpiarError(correoCliente);


        const formatoCorreo =
            /^[^\s@]+@(gmail\.com|duoc\.cl|duocuc\.cl)$/i;


        if (
            !formatoCorreo.test(correo)
        ) {

            mostrarError(
                correoCliente,
                "Debe ingresar un correo @gmail.com, @duoc.cl o @duocuc.cl."
            );

            return false;

        }


        return true;

    }


    /* VALIDAR DIRECCION */

    function validarDireccion() {

        if (tipoEntrega === "retiro") {

            limpiarError(
                direccionCliente
            );

            return true;

        }


        const direccion =
            direccionCliente.value.trim();


        limpiarError(
            direccionCliente
        );


        if (
            direccion.length < 10 ||
            direccion.length > 100
        ) {

            mostrarError(
                direccionCliente,
                "Debe ingresar entre 10 y 100 caracteres."
            );

            return false;

        }


        return true;

    }


    /* VALIDAR COMUNA */

    function validarComuna() {

        if (tipoEntrega === "retiro") {

            limpiarError(
                comunaCliente
            );

            return true;

        }


        limpiarError(
            comunaCliente
        );


        if (
            comunaCliente.value === ""
        ) {

            mostrarError(
                comunaCliente,
                "Debe seleccionar una comuna."
            );

            return false;

        }


        return true;

    }


    /* VALIDAR FORMULARIO */

    function validarFormulario() {

        const nombreValido =
            validarNombre();

        const apellidoValido =
            validarApellido();

        const telefonoValido =
            validarTelefono();

        const correoValido =
            validarCorreo();

        const direccionValida =
            validarDireccion();

        const comunaValida =
            validarComuna();


        return (
            nombreValido &&
            apellidoValido &&
            telefonoValido &&
            correoValido &&
            direccionValida &&
            comunaValida
        );

    }


    /* VALIDAR AL SALIR DEL CAMPO */

    nombreCliente.addEventListener(
        "blur",
        validarNombre
    );


    apellidoCliente.addEventListener(
        "blur",
        validarApellido
    );


    telefonoCliente.addEventListener(
        "blur",
        validarTelefono
    );


    correoCliente.addEventListener(
        "blur",
        validarCorreo
    );


    direccionCliente.addEventListener(
        "blur",
        validarDireccion
    );


    comunaCliente.addEventListener(
        "change",
        validarComuna
    );


    /* QUITAR ERROR AL ESCRIBIR */

    nombreCliente.addEventListener(
        "input",
        function() {

            limpiarError(nombreCliente);

        }
    );


    apellidoCliente.addEventListener(
        "input",
        function() {

            limpiarError(apellidoCliente);

        }
    );


    telefonoCliente.addEventListener(
        "input",
        function() {

            limpiarError(telefonoCliente);

        }
    );


    correoCliente.addEventListener(
        "input",
        function() {

            limpiarError(correoCliente);

        }
    );


    direccionCliente.addEventListener(
        "input",
        function() {

            limpiarError(direccionCliente);

        }
    );


    /* ENVIAR FORMULARIO */

    formEntrega.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const formularioValido =
                validarFormulario();


            if (!formularioValido) {

                const primerError =
                    document.querySelector(
                        ".campo-error"
                    );


                if (primerError) {

                    primerError.focus();

                }


                return;

            }


            const costo =
                tipoEntrega === "delivery"
                    ? valorDelivery
                    : 0;


            const total =
                subtotal + costo;


            const pedido = {

                productos:
                    carritoGuardado,

                cliente: {

                    nombre:
                        nombreCliente.value.trim(),

                    apellido:
                        apellidoCliente.value.trim(),

                    telefono:
                        telefonoCliente.value.trim(),

                    correo:
                        correoCliente.value.trim(),

                    direccion:
                        tipoEntrega === "delivery"
                            ? direccionCliente.value.trim()
                            : "",

                    comuna:
                        tipoEntrega === "delivery"
                            ? comunaCliente.value
                            : "",

                    referencia:
                        tipoEntrega === "delivery"
                            ? referenciaCliente.value.trim()
                            : ""

                },

                tipoEntrega:
                    tipoEntrega,

                metodoPago:
                    metodoPago,

                subtotal:
                    subtotal,

                delivery:
                    costo,

                total:
                    total

            };


            sessionStorage.setItem(
                "pedido",
                JSON.stringify(pedido)
            );


            window.location.href =
                "confirmacion.html";

        }
    );


    /* ESTADO INICIAL */

    if (
        !telefonoCliente.value.trim()
    ) {

        telefonoCliente.value =
            "+569";

    }


    seleccionarDelivery();

    seleccionarTarjeta();

});