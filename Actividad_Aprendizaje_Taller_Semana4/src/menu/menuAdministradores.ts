import { rl } from "../utils/readline";
import { crearAdministrador, buscarAdministradorPorId, listarAdministradores, actualizarAdministrador, eliminarAdministrador } from "../services/usuarioService";
import { Rol } from "../models/rol";
import { menuPrincipal } from "./menuPrincipal";

// Roles predefinidos
const rolesDisponibles: Rol[] = [
    new Rol(1, "junior", "Acceso limitado"),
    new Rol(2, "senior", "Acceso moderado"),
    new Rol(3, "gerente", "Acceso total")
];

export function menuAdministradores(): void {
    console.log("----- Menú Administradores -----");
    console.log("1. Registrar administrador");
    console.log("2. Listar administradores");
    console.log("3. Buscar administrador por ID");
    console.log("4. Actualizar administrador");
    console.log("5. Eliminar administrador");
    console.log("6. Volver al menú principal");

    rl.question("Seleccione una opción: ", (opcion) => {
        switch (opcion) {
            case "1":
                registrarAdministrador();
                break;
            case "2":
                listarAdministradoresMenu();
                break;
            case "3":
                buscarAdministradorMenu();
                break;
            case "4":
                actualizarAdministradorMenu();
                break;
            case "5":
                eliminarAdministradorMenu();
                break;
            case "6":
                menuPrincipal();
                break;
            default:
                console.log("Opción inválida");
                menuAdministradores();
        }
    });
}

function registrarAdministrador(): void {
    rl.question("Nombre: ", (nombre) => {
        rl.question("Correo: ", (correo) => {
            rl.question("Teléfono: ", (telefono) => {
                rl.question("Dirección: ", (direccion) => {
                    console.log("Rol disponible:");
                    console.log("1. junior - Acceso limitado");
                    console.log("2. senior - Acceso moderado");
                    console.log("3. gerente - Acceso total");
                    rl.question("Seleccione rol: ", (rolOp) => {
                        try {
                            const rol = rolesDisponibles[parseInt(rolOp) - 1];
                            if (!rol) {
                                console.log("Rol inválido");
                                menuAdministradores();
                                return;
                            }

                            const admin = crearAdministrador(nombre, correo, telefono, direccion, rol);
                            console.log(`Administrador registrado exitosamente con ID: ${admin.idUsuario}`);
                            admin.mostrarPermisos();
                            menuAdministradores();
                        } catch (error: any) {
                            console.log(`Error: ${error.message}`);
                            menuAdministradores();
                        }
                    });
                });
            });
        });
    });
}

function listarAdministradoresMenu(): void {
    const admins = listarAdministradores();
    if (admins.length === 0) {
        console.log("No hay administradores registrados");
    } else {
        console.log("Lista de Administradores:");
        admins.forEach(admin => {
            console.log(`  ${admin.obtenerInfo()}`);
        });
    }
    menuAdministradores();
}

function buscarAdministradorMenu(): void {
    rl.question("Ingrese el ID del administrador para buscarlo: ", (id) => {
        try {
            const admin = buscarAdministradorPorId(parseInt(id));
            if (admin) {
                admin.mostrarDetalles();
                admin.mostrarPermisos();
            } else {
                console.log("Administrador no encontrado");
            }
            menuAdministradores();
        } catch (error: any) {
            console.log(`Error: ${error.message}`);
            menuAdministradores();
        }
    });
}

function actualizarAdministradorMenu(): void {
    rl.question("Ingrese el ID del administrador para actualizarlo: ", (id) => {
        const admin = buscarAdministradorPorId(parseInt(id));
        if (!admin) {
            console.log("Administrador no encontrado");
            menuAdministradores();
            return;
        }

        rl.question("Nuevo nombre: ", (nombre) => {
            rl.question("Nuevo correo: ", (correo) => {
                rl.question("Nuevo teléfono: ", (telefono) => {
                    rl.question("Nueva dirección: ", (direccion) => {
                        console.log("\nRol disponible:");
                        console.log("1. junior - Acceso limitado");
                        console.log("2. senior - Acceso moderado");
                        console.log("3. gerente - Acceso total");
                        rl.question("Seleccione rol: ", (rolOp) => {
                            try {
                                const rol = rolesDisponibles[parseInt(rolOp) - 1];
                                if (!rol) {
                                    console.log("Rol inválido");
                                    menuAdministradores();
                                    return;
                                }

                                const actualizado = actualizarAdministrador(
                                    parseInt(id),
                                    nombre,
                                    correo,
                                    telefono,
                                    direccion,
                                    rol
                                );

                                if (actualizado) {
                                    console.log("Administrador actualizado exitosamente");
                                } else {
                                    console.log("Error al actualizar el administrador");
                                }
                                menuAdministradores();
                            } catch (error: any) {
                                console.log(`Error: ${error.message}`);
                                menuAdministradores();
                            }
                        });
                    });
                });
            });
        });
    });
}

function eliminarAdministradorMenu(): void {
    rl.question("Ingrese el ID del administrador para eliminarlo: ", (id) => {
        try {
            const eliminado = eliminarAdministrador(parseInt(id));
            if (eliminado) {
                console.log("Administrador eliminado exitosamente");
            }
            menuAdministradores();
        } catch (error: any) {
            console.log(`Error: ${error.message}`);
            menuAdministradores();
        }
    });
}