import { Cliente } from "../../domain/entities/Cliente";
import { Cpf } from "../../domain/valueObjects/Cpf.vo";

export interface ClienteRepository {
    salvaCliente(cliente: Cliente): Promise<Cliente>;
    buscaClientePorId(id: number): Promise<Cliente | undefined>
    buscaClientePorCpf(cpf: Cpf): Promise<Cliente | undefined>
}