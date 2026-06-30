import { rl } from "../utils/readline";
import { crearCliente, buscarClientePorId, listarClientes, actualizarCliente, eliminarCliente } from "../services/usuarioService";
import { TipoCliente } from "../models/tipoCliente";
import { menuPrincipal } from "./menuPrincipal";

export function menuClientes(): void {
    console.log("----- Menú Clientes -----");
    console.log("1. Registrar cliente");
    console.log("2. Listar clientes");
    console.log("3. Buscar cliente por ID");
    console.log("4. Actualizar cliente");
    console.log("5. Eliminar cliente");
    console.log("6. Volver al menú principal");

    rl.question("Seleccione una opción: ", (opcion) => {
        switch (opcion) {
            case "1":
                registrarCliente();
                break;
            case "2":
                listarClientesMenu();
                break;
            case "3":
                buscarClienteMenu();
                break;
            case "4":
                actualizarClienteMenu();
                break;
            case "5":
                eliminarClienteMenu();
                break;
            case "6":
                menuPrincipal();
                break;
            default:
                console.log("Opción inválida");
                menuClientes();
        }
    });
}

function registrarCliente(): void {
    rl.question("Nombre: ", (nombre) => {
        rl.question("Correo: ", (correo) => {
            rl.question("Teléfono: ", (telefono) => {
                rl.question("Dirección: ", (direccion) => {
                    console.log("Tipo de Cliente:");
                    console.log("1. Regular");
                    console.log("2. Premium");
                    console.log("3. VIP");
                    rl.question("Seleccione tipo: ", (tipo) => {
                        try {
                            const tipoCliente = 
                                tipo === "1" ? TipoCliente.REGULAR :
                                tipo === "2" ? TipoCliente.PREMIUM :
                                TipoCliente.VIP;

                            const cliente = crearCliente(nombre, correo, telefono, direccion, tipoCliente);
                            console.log(`Cliente registrado exitosamente con ID: ${cliente.idUsuario}`);
                            menuClientes();
                        } catch (error: any) {
                            console.log(`Error: ${error.message}`);
                            menuClientes();
                        }
                    });
                });
            });
        });
    });
}

function listarClientesMenu(): void {
    const clientes = listarClientes();
    if (clientes.length === 0) {
        console.log("No hay clientes registrados");
    } else {
        console.log("Lista de clientes: ");
        clientes.forEach(cliente => {
            console.log(`  ${cliente.obtenerInfo()}`);
        });
    }
    menuClientes();
}

function buscarClienteMenu(): void {
    rl.question("Ingrese el ID del cliente a buscar: ", (id) => {
        try {
            const cliente = buscarClientePorId(parseInt(id));
            if (cliente) {
                cliente.mostrarDetalles();
            } else {
                console.log("Cliente no encontrado");
            }
            menuClientes();
        } catch (error: any) {
            console.log(`Error: ${error.message}`);
            menuClientes();
        }
    });
}

function actualizarClienteMenu(): void {
    rl.question("Ingrese el ID del cliente para actualizarlo: ", (id) => {
        const cliente = buscarClientePorId(parseInt(id));
        if (!cliente) {
            console.log("Cliente no encontrado");
            menuClientes();
            return;
        }

        rl.question("Nuevo nombre: ", (nombre) => {
            rl.question("Nuevo correo: ", (correo) => {
                rl.question("Nuevo teléfono: ", (telefono) => {
                    rl.question("Nueva dirección: ", (direccion) => {
                        console.log("Tipo de Cliente:");
                        console.log("1. Regular");
                        console.log("2. Premium");
                        console.log("3. VIP");
                        rl.question("Seleccione tipo: ", (tipo) => {
                            try {
                                const tipoCliente = 
                                    tipo === "1" ? TipoCliente.REGULAR :
                                    tipo === "2" ? TipoCliente.PREMIUM :
                                    TipoCliente.VIP;

                                const actualizado = actualizarCliente(
                                    parseInt(id),
                                    nombre,
                                    correo,
                                    telefono,
                                    direccion,
                                    tipoCliente
                                );

                                if (actualizado) {
                                    console.log("Cliente actualizado exitosamente");
                                } else {
                                    console.log("Error al actualizar el cliente");
                                }
                                menuClientes();
                            } catch (error: any) {
                                console.log(`Error: ${error.message}`);
                                menuClientes();
                            }
                        });
                    });
                });
            });
        });
    });
}

function eliminarClienteMenu(): void {
    rl.question("Ingrese el ID del cliente para eliminarlo: ", (id) => {
        try {
            const eliminado = eliminarCliente(parseInt(id));
            if (eliminado) {
                console.log("Cliente eliminado exitosamente");
            }
            menuClientes();
        } catch (error: any) {
            console.log(`Error: ${error.message}`);
            menuClientes();
        }
    });
}