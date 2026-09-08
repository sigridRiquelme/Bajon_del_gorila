const pedidos = [
    {
        id: 1001,
        cliente: "Juan Pérez",
        fecha: "07/09/2026",
        productos: "Hamburguesa Gorila x1, Papas fritas x1",
        total: 12990,
        estado: "Pendiente"
    },

    {
        id: 1002,
        cliente: "Camila Soto",
        fecha: "07/09/2026",
        productos: "Hamburguesa Gorila x2",
        total: 17980,
        estado: "Preparando"
    },

    {
        id: 1003,
        cliente: "Diego González",
        fecha: "06/09/2026",
        productos: "Completo x2, Bebida x2",
        total: 10500,
        estado: "Listo"
    },

    {
        id: 1004,
        cliente: "Fernanda Silva",
        fecha: "06/09/2026",
        productos: "Churrasco italiano x1",
        total: 7990,
        estado: "Entregado"
    }
];


const listaPedidos = document.getElementById("listaPedidos");

const contadorPedidos =
    document.getElementById("contadorPedidos");

const buscarPedido =
    document.getElementById("buscarPedido");

const filtroEstadoPedido =
    document.getElementById("filtroEstadoPedido");


function mostrarPedidos(lista = pedidos) {

    listaPedidos.innerHTML = "";


    lista.forEach(function(pedido) {

        listaPedidos.innerHTML += `
            <tr>

                <td>
                    <strong>
                        #${pedido.id}
                    </strong>
                </td>


                <td>
                    ${pedido.cliente}
                </td>


                <td>
                    ${pedido.fecha}
                </td>


                <td>
                    ${pedido.productos}
                </td>


                <td class="precio">
                    $${pedido.total.toLocaleString("es-CL")}
                </td>


                <td>

                    <select
                        class="estado-producto"
                        onchange="cambiarEstadoPedido(${pedido.id}, this.value)"
                    >

                        <option
                            value="Pendiente"
                            ${pedido.estado === "Pendiente" ? "selected" : ""}
                        >
                            Pendiente
                        </option>


                        <option
                            value="Preparando"
                            ${pedido.estado === "Preparando" ? "selected" : ""}
                        >
                            Preparando
                        </option>


                        <option
                            value="Listo"
                            ${pedido.estado === "Listo" ? "selected" : ""}
                        >
                            Listo
                        </option>


                        <option
                            value="Entregado"
                            ${pedido.estado === "Entregado" ? "selected" : ""}
                        >
                            Entregado
                        </option>


                        <option
                            value="Cancelado"
                            ${pedido.estado === "Cancelado" ? "selected" : ""}
                        >
                            Cancelado
                        </option>

                    </select>

                </td>

            </tr>
        `;

    });


    contadorPedidos.textContent =
        `${lista.length} de ${pedidos.length} pedidos`;
}



function cambiarEstadoPedido(id, nuevoEstado) {

    const pedido = pedidos.find(function(pedido) {
        return pedido.id === id;
    });


    if (pedido) {
        pedido.estado = nuevoEstado;
    }
}



function aplicarFiltrosPedidos() {

    const textoBusqueda =
        buscarPedido.value
            .toLowerCase()
            .trim();


    const estadoSeleccionado =
        filtroEstadoPedido.value;


    const pedidosFiltrados =
        pedidos.filter(function(pedido) {


            const coincideCliente =
                pedido.cliente
                    .toLowerCase()
                    .includes(textoBusqueda);


            const coincideNumero =
                pedido.id
                    .toString()
                    .includes(textoBusqueda);


            const coincideBusqueda =
                coincideCliente || coincideNumero;


            const coincideEstado =
                estadoSeleccionado === "todos" ||
                pedido.estado.toLowerCase() === estadoSeleccionado;


            return coincideBusqueda && coincideEstado;

        });


    mostrarPedidos(pedidosFiltrados);
}



buscarPedido.addEventListener(
    "input",
    aplicarFiltrosPedidos
);


filtroEstadoPedido.addEventListener(
    "change",
    aplicarFiltrosPedidos
);


mostrarPedidos();