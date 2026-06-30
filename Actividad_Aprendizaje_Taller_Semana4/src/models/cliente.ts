import { Usuario } from "./usuario";
import { TipoCliente } from "./tipoCliente";

export class Cliente extends Usuario {
    tipo_cliente: TipoCliente;
    numeroCompras: number = 0;
    montoTotal: number = 0;

    constructor(
        idUsuario: number,
        nombre: string,
        correo: string,
        telefono: string,
        direccion: string,
        tipo_cliente: TipoCliente
    ) {
        super(idUsuario, nombre, correo, telefono, direccion);
        this.tipo_cliente = tipo_cliente;
    }

    obtenerInfo(): string {
        return `Cliente: ${this.nombre} | Tipo: ${this.tipo_cliente} | Email: ${this.correo} | Compras: ${this.numeroCompras}`;
    }

    registrarCompra(monto: number): void {
        this.numeroCompras++;
        this.montoTotal += monto;
        console.log(`Compra registrada. Compras totales: ${this.numeroCompras} | Monto acumulado: $${this.montoTotal}`);
    }
}