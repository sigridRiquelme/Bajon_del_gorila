const btnDelivery =
    document.getElementById("btnDelivery");

const btnRetiro =
    document.getElementById("btnRetiro");


const contenedorDireccion =
    document.getElementById("contenedorDireccion");

const contenedorComuna =
    document.getElementById("contenedorComuna");

const contenedorReferencia =
    document.getElementById("contenedorReferencia");


const direccionCliente =
    document.getElementById("direccionCliente");

const comunaCliente =
    document.getElementById("comunaCliente");


const costoDelivery =
    document.getElementById("costoDelivery");

const totalEntrega =
    document.getElementById("totalEntrega");


const pagoTarjeta =
    document.getElementById("pagoTarjeta");

const pagoEfectivo =
    document.getElementById("pagoEfectivo");


const formEntrega =
    document.getElementById("formEntrega");


const subtotal = 8990;

const valorDelivery = 2000;


let tipoEntrega = "delivery";

let metodoPago = "tarjeta";



function seleccionarDelivery() {

    tipoEntrega = "delivery";


    btnDelivery.classList.add("activa");

    btnRetiro.classList.remove("activa");


    contenedorDireccion.style.display = "flex";

    contenedorComuna.style.display = "flex";

    contenedorReferencia.style.display = "flex";


    direccionCliente.required = true;

    comunaCliente.required = true;


    costoDelivery.textContent =
        `$${valorDelivery.toLocaleString("es-CL")}`;


    const total =
        subtotal + valorDelivery;


    totalEntrega.textContent =
        `$${total.toLocaleString("es-CL")}`;
}



function seleccionarRetiro() {

    tipoEntrega = "retiro";


    btnRetiro.classList.add("activa");

    btnDelivery.classList.remove("activa");


    contenedorDireccion.style.display = "none";

    contenedorComuna.style.display = "none";

    contenedorReferencia.style.display = "none";


    direccionCliente.required = false;

    comunaCliente.required = false;


    costoDelivery.textContent =
        "$0";


    totalEntrega.textContent =
        `$${subtotal.toLocaleString("es-CL")}`;
}



function seleccionarTarjeta() {

    metodoPago = "tarjeta";


    pagoTarjeta.classList.add("activa");

    pagoEfectivo.classList.remove("activa");
}



function seleccionarEfectivo() {

    metodoPago = "efectivo";


    pagoEfectivo.classList.add("activa");

    pagoTarjeta.classList.remove("activa");
}



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



formEntrega.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        window.location.href =
            "confirmacion.html";

    }
);