document.addEventListener("DOMContentLoaded", () => {
  const form =
      document.getElementById("formRegistro");

  // Inputs del formulario
  const nombreInput =
      document.getElementById("nombre");
  const correoInput =
      document.getElementById("correo");
  const passwordInput =
      document.getElementById("password");
  const confirmPasswordInput =
      document.getElementById("confirmPassword");
  const telefonoInput =
      document.getElementById("telefono");

  // Contenedores de mensajes de error
  const errorNombre =
      document.getElementById("errorNombre");
  const errorCorreo =
      document.getElementById("errorCorreo");
  const errorPassword =
      document.getElementById("errorPassword");
  const errorConfirmPassword =
      document.getElementById("errorConfirmPassword");
  const errorTelefono =
      document.getElementById("errorTelefono");

  // Mensaje general de exito
  const alertSuccess =
      document.getElementById("alertSuccess");

  // Validacion de Nombre
  function validarNombre(valor) {
    const v = valor.trim();
    if (v === "") {
        return "El nombre completo es obligatorio.";
    }
    if (v.length < 3) {
        return "El nombre debe tener al menos 3 caracteres.";
    }
    return "";
  }

  // Validacion de Correo (solo validos los indicados ej: @duoc.cl)
  function validarCorreo(valor) {
    const v = valor.trim();
    if (v === "") {
        return "El correo electrónico es obligatorio.";
    }
    if (v.length > 100) {
        return "El correo no puede tener más de 100 caracteres.";
    }

    const regexCorreo = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
    if (!regexCorreo.test(v)) {
      return "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com";
    }
    return "";
  }

  // Validacion de Contraseña (entre 4 y 10 caracteres)
  function validarPassword(valor) {
    const v = valor.trim();
    if (v === "") {
        return "La contraseña es obligatoria.";
    }
    if (v.length < 4 || v.length > 10) {
      return "La contraseña debe tener entre 4 y 10 caracteres.";
    }
    return "";
  }

  // Confirmacion de Contraseña
  function validarConfirmPassword(valor, passOriginal) {
    const v = valor.trim();
    if (v === "") {
        return "Debes confirmar tu contraseña.";
    }
    if (v !== passOriginal.trim()) {
        return "Las contraseñas no coinciden.";
    }
    return "";
  }

  // Validacion de Telefono
  function validarTelefono(valor) {
    const v = valor.trim();
    if (v === "") {
        return "El teléfono de contacto es obligatorio.";
    }
    const regexTel = /^[0-9+ ]{8,12}$/;
    if (!regexTel.test(v)) {
        return "Formato inválido (ej: +56912345678 o 912345678).";
    }
    return "";
  }

  // Modificar borde y texto de error segun estado
  function pintarEstado(input, elementoError, mensaje) {
    elementoError.textContent = mensaje;
    input.style.borderColor = mensaje ? "#FF4D4D" : "#444444";
  }

  // Validaciones en tiempo real
  nombreInput.addEventListener("input", () => {
    pintarEstado(nombreInput, errorNombre, validarNombre(nombreInput.value));
  });

  correoInput.addEventListener("input", () => {
    pintarEstado(correoInput, errorCorreo, validarCorreo(correoInput.value));
  });

  passwordInput.addEventListener("input", () => {
    pintarEstado(passwordInput, errorPassword, validarPassword(passwordInput.value));
    if (confirmPasswordInput.value.trim() !== "") {
      pintarEstado(
        confirmPasswordInput,
        errorConfirmPassword,
        validarConfirmPassword(confirmPasswordInput.value, passwordInput.value)
      );
    }
  });

  confirmPasswordInput.addEventListener("input", () => {
    pintarEstado(
      confirmPasswordInput,
      errorConfirmPassword,
      validarConfirmPassword(confirmPasswordInput.value, passwordInput.value)
    );
  });

  telefonoInput.addEventListener("input", () => {
    pintarEstado(telefonoInput, errorTelefono, validarTelefono(telefonoInput.value));
  });

  // Submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const msgNombre = validarNombre(nombreInput.value);
    const msgCorreo = validarCorreo(correoInput.value);
    const msgPass = validarPassword(passwordInput.value);
    const msgConfirm = validarConfirmPassword(confirmPasswordInput.value, passwordInput.value);
    const msgTel = validarTelefono(telefonoInput.value);

    pintarEstado(nombreInput, errorNombre, msgNombre);
    pintarEstado(correoInput, errorCorreo, msgCorreo);
    pintarEstado(passwordInput, errorPassword, msgPass);
    pintarEstado(confirmPasswordInput, errorConfirmPassword, msgConfirm);
    pintarEstado(telefonoInput, errorTelefono, msgTel);

    // Si no existen errores en el formulario
    if (!msgNombre && !msgCorreo && !msgPass && !msgConfirm && !msgTel) {
      alertSuccess.textContent = "¡Registro exitoso! Redirigiendo a iniciar sesión...";
      alertSuccess.style.display = "block";

      // Guarda simulacion de nuevo usuario en el navegador
      localStorage.setItem("usuarioRegistrado", correoInput.value.trim());

      // Redirige automaticamente al login
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);
    } else {
      alertSuccess.style.display = "none";
    }
  });
});
