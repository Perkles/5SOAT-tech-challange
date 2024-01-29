import { Cliente } from "../../domain/entities/Cliente";

export interface ClienteRepository {
    salvaCliente(cliente: Cliente): Promise<Cliente>;
    buscaClientePorId(id: number): Promise<Cliente | undefined>
}