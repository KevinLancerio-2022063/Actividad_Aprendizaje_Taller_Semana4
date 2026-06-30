import { Cliente } from "../models/cliente";
import { Administrador } from "../models/administrador";
import { Usuario } from "../models/usuario";
import { TipoCliente } from "../models/tipoCliente";
import { Rol } from "../models/rol";

const usuarios: Usuario[] = [];
let incrementarIDUsuario = 1;

// Validaciones
function validarId(id: number): void {
    if (!id || isNaN(id) || id <= 0) {
        throw new Error("El ID debe ser un número mayor a 0.");
    }
}

function validarDatos(nombre: string, correo: string, telefono: string, direccion: string): void {
    if (!nombre || nombre.trim() === "") {
        throw new Error("El nombre es obligatorio y no puede estar vacío.");
    }

    if (!correo || correo.trim() === "") {
        throw new Error("El correo es obligatorio y no puede estar vacío.");
    }

    if (!correo.includes("@") || !correo.includes(".")) {
        throw new Error("El formato del correo no es válido (debe contener @ y .).");
    }

    if (!telefono || telefono.trim() === "") {
        throw new Error("El teléfono es obligatorio y no puede estar vacío.");
    }
    
    if (!direccion || direccion.trim() === "") {
        throw new Error("La dirección es obligatoria y no puede estar vacía.");
    }
}

// --- CRUD para CLIENTES ---

export function crearCliente(
    nombre: string,
    correo: string,
    telefono: string,
    direccion: string,
    tipo_cliente: TipoCliente
): Cliente {
    validarDatos(nombre, correo, telefono, direccion);

    const cliente = new Cliente(
        incrementarIDUsuario++,
        nombre,
        correo,
        telefono,
        direccion,
        tipo_cliente
    );

    usuarios.push(cliente);
    return cliente;
}

export function buscarClientePorId(id: number): Cliente | null {
    validarId(id);
    const usuario = usuarios.find(u => u.idUsuario === id && u instanceof Cliente);
    return usuario instanceof Cliente ? usuario : null;
}

export function listarClientes(): Cliente[] {
    return usuarios.filter(u => u instanceof Cliente) as Cliente[];
}

export function actualizarCliente(
    id: number,
    nombre: string,
    correo: string,
    telefono: string,
    direccion: string,
    tipo_cliente: TipoCliente
): boolean {
    const cliente = buscarClientePorId(id);

    if (!cliente) return false;

    validarDatos(nombre, correo, telefono, direccion);

    cliente.nombre = nombre;
    cliente.correo = correo;
    cliente.telefono = telefono;
    cliente.direccion = direccion;
    cliente.tipo_cliente = tipo_cliente;

    return true;
}

export function eliminarCliente(id: number): boolean {
    validarId(id);
    const index = usuarios.findIndex(u => u.idUsuario === id && u instanceof Cliente);

    if (index === -1) {
        throw new Error(`No se encontró ningún cliente con el ID ${id}.`);
    }

    usuarios.splice(index, 1);
    return true;
}

// CRUD para los Administradores

export function crearAdministrador(
    nombre: string,
    correo: string,
    telefono: string,
    direccion: string,
    rol: Rol
): Administrador {
    validarDatos(nombre, correo, telefono, direccion);

    const admin = new Administrador(
        incrementarIDUsuario++,
        nombre,
        correo,
        telefono,
        direccion,
        rol
    );

    usuarios.push(admin);
    return admin;
}

export function buscarAdministradorPorId(id: number): Administrador | null {
    validarId(id);
    const usuario = usuarios.find(u => u.idUsuario === id && u instanceof Administrador);
    return usuario instanceof Administrador ? usuario : null;
}

export function listarAdministradores(): Administrador[] {
    return usuarios.filter(u => u instanceof Administrador) as Administrador[];
}

export function actualizarAdministrador(
    id: number,
    nombre: string,
    correo: string,
    telefono: string,
    direccion: string,
    rol: Rol
): boolean {
    const admin = buscarAdministradorPorId(id);

    if (!admin) return false;

    validarDatos(nombre, correo, telefono, direccion);

    admin.nombre = nombre;
    admin.correo = correo;
    admin.telefono = telefono;
    admin.direccion = direccion;
    admin.rol = rol;
    admin.asignarPermisos();

    return true;
}

export function eliminarAdministrador(id: number): boolean {
    validarId(id);
    const index = usuarios.findIndex(u => u.idUsuario === id && u instanceof Administrador);

    if (index === -1) {
        throw new Error(`No se encontró ningún administrador con el ID ${id}.`);
    }

    usuarios.splice(index, 1);
    return true;
}

// Búsquedas Generales

export function buscarPorNombre(nombre: string): Usuario[] {
    return usuarios.filter(u =>
        u.nombre.toLowerCase().includes(nombre.toLowerCase())
    );
}

export function buscarPorCorreo(correo: string): Usuario | null {
    return usuarios.find(u => u.correo === correo) || null;
}

export function listarTodos(): Usuario[] {
    return usuarios;
}

export function obtenerEstadisticas(): void {
    const clientes = listarClientes().length;
    const admins = listarAdministradores().length;
    console.log(`Estadísticas del Sistema:`);
    console.log(`Clientes: ${clientes}`);
    console.log(`Administradores: ${admins}`);
    console.log(`Total de usuarios: ${usuarios.length}`);
}