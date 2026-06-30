export class Rol {
    idRol: number;
    nombre: string;
    descripcion: string;

    constructor(idRol: number, nombre: string, descripcion: string) {
        this.idRol = idRol;
        this.nombre = nombre;
        this.descripcion = descripcion;
    }
}