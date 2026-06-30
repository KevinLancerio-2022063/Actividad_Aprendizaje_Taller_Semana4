import { Usuario } from "./usuario";
import { Rol } from "./rol";

export class Administrador extends Usuario {
    rol: Rol;
    permisos: string[] = [];

    constructor(
        idUsuario: number,
        nombre: string,
        correo: string,
        telefono: string,
        direccion: string,
        rol: Rol
    ) {
        super(idUsuario, nombre, correo, telefono, direccion);
        this.rol = rol;
        this.asignarPermisos();
    }

    obtenerInfo(): string {
        return `Admin: ${this.nombre} | Rol: ${this.rol.nombre} | Email: ${this.correo} | Permisos: ${this.permisos.length}`;
    }

    public asignarPermisos(): void {
        if (this.rol.nombre === "junior") {
            this.permisos = ["ver_usuarios", "ver_reportes"];
        } else if (this.rol.nombre === "senior") {
            this.permisos = ["ver_usuarios", "ver_reportes", "editar_usuarios"];
        } else if (this.rol.nombre === "gerente") {
            this.permisos = ["ver_usuarios", "ver_reportes", "editar_usuarios", "eliminar_usuarios", "crear_usuarios"];
        }
    }

    obtenerPermisos(): string[] {
        return this.permisos;
    }

    mostrarPermisos(): void {
        console.log(`Permisos de ${this.nombre} (${this.rol.nombre}):`);
        this.permisos.forEach(permiso => console.log(`${permiso}`));
        console.log();
    }
}