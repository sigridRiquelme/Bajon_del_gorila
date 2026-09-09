const usuarios = [
    {
        id: 1,
        nombre: "Juan Pérez",
        correo: "juan@gmail.com",
        rol: "Cliente",
        estado: "Activo"
    },
    {
        id: 2,
        nombre: "Sigrid",
        correo: "admin@duoc.cl",
        rol: "Administrador",
        estado: "Activo"
    }
];



const listaUsuarios = document.getElementById("listaUsuarios");
const contadorUsuarios = document.getElementById("contadorUsuarios");

const buscarUsuario = document.getElementById("buscarUsuario");
const filtroRol = document.getElementById("filtroRol");


function mostrarUsuarios(lista = usuarios) {

    listaUsuarios.innerHTML = "";

    lista.forEach(function(usuario) {

        listaUsuarios.innerHTML += `
            <tr>

                <td>
                    <strong>${usuario.nombre}</strong>
                </td>

                <td>
                    ${usuario.correo}
                </td>

                <td>

                    <select
                        class="estado-producto"
                        onchange="cambiarRol(${usuario.id}, this.value)"
                    >

                        <option value="Cliente"
                            ${usuario.rol === "Cliente" ? "selected" : ""}>
                            Cliente
                        </option>

                        <option value="Administrador"
                            ${usuario.rol === "Administrador" ? "selected" : ""}>
                            Administrador
                        </option>

                    </select>

                </td>

                <td>

                    <select
                        class="estado-producto"
                        onchange="cambiarEstadoUsuario(${usuario.id}, this.value)"
                    >

                        <option value="Activo"
                            ${usuario.estado === "Activo" ? "selected" : ""}>
                            Activo
                        </option>

                        <option value="Bloqueado"
                            ${usuario.estado === "Bloqueado" ? "selected" : ""}>
                            Bloqueado
                        </option>

                    </select>

                </td>

                <td class="acciones">

                    <button
                        class="btn-eliminar"
                        onclick="eliminarUsuario(${usuario.id})"
                    >
                        ELIMINAR
                    </button>

                </td>

            </tr>
        `;

    });


    contadorUsuarios.textContent =
        `${lista.length} de ${usuarios.length} usuarios`;
}


function cambiarRol(id, nuevoRol) {

    const usuario = usuarios.find(function(usuario) {
        return usuario.id === id;
    });

    if (usuario) {
        usuario.rol = nuevoRol;
    }
}


function cambiarEstadoUsuario(id, nuevoEstado) {

    const usuario = usuarios.find(function(usuario) {
        return usuario.id === id;
    });

    if (usuario) {
        usuario.estado = nuevoEstado;
    }
}


function eliminarUsuario(id) {

    const confirmar = confirm(
        "¿Seguro que deseas eliminar este usuario?"
    );

    if (!confirmar) {
        return;
    }

    const posicion = usuarios.findIndex(function(usuario) {
        return usuario.id === id;
    });

    if (posicion !== -1) {

        usuarios.splice(posicion, 1);

        mostrarUsuarios();
    }
}


function aplicarFiltrosUsuarios() {

    const textoBusqueda =
        buscarUsuario.value.toLowerCase();

    const rolSeleccionado =
        filtroRol.value;


    const usuariosFiltrados = usuarios.filter(function(usuario) {

        const coincideNombre =
            usuario.nombre
                .toLowerCase()
                .includes(textoBusqueda);


        const coincideCorreo =
            usuario.correo
                .toLowerCase()
                .includes(textoBusqueda);


        const coincideBusqueda =
            coincideNombre || coincideCorreo;


        const coincideRol =
            rolSeleccionado === "todos" ||
            usuario.rol.toLowerCase() === rolSeleccionado;


        return coincideBusqueda && coincideRol;
    });


    mostrarUsuarios(usuariosFiltrados);
}


buscarUsuario.addEventListener(
    "input",
    aplicarFiltrosUsuarios
);


filtroRol.addEventListener(
    "change",
    aplicarFiltrosUsuarios
);


mostrarUsuarios();