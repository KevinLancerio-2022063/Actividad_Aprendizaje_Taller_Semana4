export abstract class Usuario {
    idUsuario: number;
    nombre: string;
    correo: string;
    telefono: string;
    direccion: string;
    fechaRegistro: Date;

    constructor(
        idUsuario: number,
        nombre: string,
        correo: string,
        telefono: string,
        direccion: string
    ) {
        this.idUsuario = idUsuario;
        this.nombre = nombre;
        this.correo = correo;
        this.telefono = telefono;
        this.direccion = direccion;
        this.fechaRegistro = new Date();
    }

    // Método abstracto que deben implementar las subclases
    abstract obtenerInfo(): string;

    mostrarDetalles(): void {
        console.log("----- Detalles del Usuario -----");
        console.log(`ID: ${this.idUsuario}`);
        console.log(`Nombre: ${this.nombre}`);
        console.log(`Correo: ${this.correo}`);
        console.log(`Teléfono: ${this.telefono}`);
        console.log(`Dirección: ${this.direccion}`);
        console.log(`Fecha de Registro: ${this.fechaRegistro.toLocaleDateString()}`);
        console.log("--------------------------------");
    }
}