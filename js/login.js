document.addEventListener("DOMContentLoaded", () => {
    const form =
        document.getElementById("formLogin");
    const correoInput =
        document.getElementById("correo");
    const passwordInput =
        document.getElementById("password");

    const errorCorreo =
        document.getElementById("errorCorreo");
    const errorPassword =
        document.getElementById("errorPassword");
    const alertSuccess =
        document.getElementById("alertSuccess");

    // Funcion de validacion de correo segun pauta
    // - Requerido
    // - Maximo 100 caracteres
    // - Solo dominios como @duoc.cl, @profesor.duoc.cl y @gmail.com

    function validarCorreo(valor) {
        const v = valor.trim();

        if (v === "") {
            return "El correo electronico es obligatorio.";
        }
        if (v.length > 100) {
            return "El correo no puede tener mas de 100 caracteres.";
        }

        // Expresion para validar formato general y dominios permitidos
    const regexCorreo = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
    if (!regexCorreo.test(v)) {
      return "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com";
        }

        return ""; // Vacio = valido
    }

    // Funcion de validacion de contraseña segun pauta
    // - Requerido
    // - Entre 4 y 10 caracteres

    function validarPassword(valor) {
        if (valor == "") {
            return "La contraseña es obligatoria."
        }
        if (valor.length < 4 || valor.length > 10) {
            return "La contraseña debe tener entre 4 y 10 caracteres.";
        }
        return ""; //vacio = valido
    }

    // Validaciones dinamicas en tiempo real (input)
    correoInput.addEventListener("input", () => {
        const error = validarCorreo(correoInput.value);
        errorCorreo.textContent = error;
        correoInput.style.borderColor = error ? "#FF4D4D" : "#444444";
  });

    passwordInput.addEventListener("input", () => {
        const error = validarPassword(passwordInput.value);
        errorPassword.textContent = error;
        passwordInput.style.borderColor = error ? "#FF4D4D" : "#444444";
  });

  // validacion final al intentar enviar el formulario (submit)

    form.addEventListener("submit", (e) => {
        e.preventDefault(); //evita recargar la pagina

        const msgCorreo = validarCorreo(correoInput.value);
        const msgPassword = validarPassword(passwordInput.value);

        // Mostrar errores en pantalla si existen
        errorCorreo.textContent = msgCorreo;
        errorPassword.textContent = msgPassword;

        correoInput.style.borderColor = msgCorreo ? "#FF4D4D" : "#444444";
        passwordInput.style.borderColor = msgPassword ? "#FF4D4D" : "#444444";

        // si ambos campos estan correctos

        if (!msgCorreo && !msgPassword) {

                alertSuccess.textContent =
                    "¡Acceso concedido! Redirigiendo...";

                alertSuccess.style.display =
                    "block";

                setTimeout(() => {

                    window.location.href =
                        "cuenta.html";

                }, 1200);

            } else {

                alertSuccess.style.display =
                    "none";
            }
        });
    });
