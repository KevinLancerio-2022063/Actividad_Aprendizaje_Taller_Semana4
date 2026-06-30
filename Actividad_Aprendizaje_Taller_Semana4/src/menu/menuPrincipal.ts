import { rl } from "../utils/readline";
import { menuClientes } from "./menuClientes";
import { menuAdministradores } from "./menuAdministradores";
import { obtenerEstadisticas, listarTodos } from "../services/usuarioService";

export function menuPrincipal(): void {
    console.log("------- Sistema de Usuarios -------");
    console.log("1. Gestionar Clientes");
    console.log("2. Gestionar Administradores");
    console.log("3. Ver estadísticas");
    console.log("4. Listar todos los usuarios");
    console.log("5. Salir");

    rl.question("Seleccione una opción: ", (opcion) => {
        switch (opcion) {
            case "1":
                menuClientes();
                break;
            case "2":
                menuAdministradores();
                break;
            case "3":
                obtenerEstadisticas();
                menuPrincipal();
                break;
            case "4":
                mostrarTodosLosUsuarios();
                menuPrincipal();
                break;
            case "5":
                console.log("Saliendo del sistema. ¡Hasta luego!");
                rl.close();
                break;
            default:
                console.log("Opción inválida");
                menuPrincipal();
        }
    });
}

function mostrarTodosLosUsuarios(): void {
    const usuarios = listarTodos();
    if (usuarios.length === 0) {
        console.log("No hay usuarios registrados");
    } else {
        console.log("Todos los usuarios del sistema:");
        usuarios.forEach(usuario => {
            console.log(`  ${usuario.obtenerInfo()}`);
        });
    }
}