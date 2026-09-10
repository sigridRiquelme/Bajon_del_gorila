document.addEventListener("DOMContentLoaded", () => {
    const form =
        document.getElementById("formContacto");

    // Inputs
    const nombreInput =
        document.getElementById("nombre");
    const correoInput =
        document.getElementById("correo");
    const telefonoInput =
        document.getElementById("telefono");
    const asuntoSelect =
        document.getElementById("asunto");
    const mensajeTextarea =
        document.getElementById("mensaje");

    // caputa de mensajes de error
    const errorNombre =
        document.getElementById("errorNombre");
    const errorCorreo =
        document.getElementById("errorCorreo");
    const errorTelefono =
        document.getElementById("errorTelefono");
    const errorAsunto =
        document.getElementById("errorAsunto");
    const errorMensaje =
        document.getElementById("errorMensaje");

    //alerta de exito
    const alertSuccess =
        document.getElementById("alertSuccess");

    // Funciones de validacion
    function validarNombre(valor) {
        const v = valor.trim();
        if (v === "") {
            return "El nombre es obligatorio.";
        }
        if (v.length < 3) {
            return "El nombre debe tener al menos 3 caracteres.";
        }
        return "";
    }

    function validarCorreo(valor) {
        const v = valor.trim();
        if (v === "") {
            return "El correo electronico es obligatorio.";
        }
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(v)) {
            return "Ingresa un formato de correo valido (ej: usuario@correo.com.";
        }
        return "";
    }

    function validarTelefono(valor) {
        const v = valor.trim();
        if (v === "") {
            return ""; //campo opcional
        }
        const regexTel = /^[0-9+ ]{8,12}$/;
        if (!regexTel.test(v)) {
            return "Telefono invalido (ej: +56912345678 o 912345678).";
        }
        return "";
    }

    function validarAsunto(valor) {
        if (valor === "") {
            return "Debes seleccionar un motivo de contacto.";
        }
        return "";
    }

    function validarMensaje(valor) {
        const v = valor.trim();
        if (v === "") {
            return "El mensaje no puede estar vacio.";
        }
        if (v.length < 10) {
            return "El mensaje debe tener al menos 10 caracteres.";
        }
        return "";
    }

// Aplicar estilos de error o exito visual
  function pintarEstado(input, elementoError, mensaje) {
    elementoError.textContent = mensaje;
    input.style.borderColor = mensaje ? "#FF4D4D" : "#444444";
  }

  // Validacion dinamica en tiempo real
  nombreInput.addEventListener("input", () => {
    pintarEstado(nombreInput, errorNombre, validarNombre(nombreInput.value));
  });

  correoInput.addEventListener("input", () => {
    pintarEstado(correoInput, errorCorreo, validarCorreo(correoInput.value));
  });

  telefonoInput.addEventListener("input", () => {
    pintarEstado(telefonoInput, errorTelefono, validarTelefono(telefonoInput.value));
  });

  asuntoSelect.addEventListener("change", () => {
    pintarEstado(asuntoSelect, errorAsunto, validarAsunto(asuntoSelect.value));
  });

  mensajeTextarea.addEventListener("input", () => {
    pintarEstado(mensajeTextarea, errorMensaje, validarMensaje(mensajeTextarea.value));
  });

  // Validacion general al presionar enviar
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const msgNombre = validarNombre(nombreInput.value);
    const msgCorreo = validarCorreo(correoInput.value);
    const msgTelefono = validarTelefono(telefonoInput.value);
    const msgAsunto = validarAsunto(asuntoSelect.value);
    const msgMensaje = validarMensaje(mensajeTextarea.value);

    pintarEstado(nombreInput, errorNombre, msgNombre);
    pintarEstado(correoInput, errorCorreo, msgCorreo);
    pintarEstado(telefonoInput, errorTelefono, msgTelefono);
    pintarEstado(asuntoSelect, errorAsunto, msgAsunto);
    pintarEstado(mensajeTextarea, errorMensaje, msgMensaje);

    // Si no hay errores en ningun campo
    if (!msgNombre && !msgCorreo && !msgTelefono && !msgAsunto && !msgMensaje) {
      alertSuccess.textContent = "¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.";
      alertSuccess.style.display = "block";
      form.reset();

      // Ocultar mensaje tras 4 segundos
      setTimeout(() => {
        alertSuccess.style.display = "none";
      }, 4000);
    } else {
      alertSuccess.style.display = "none";
    }
  });
});
