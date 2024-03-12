import { Cliente } from "../../entities/Cliente";
import { Cpf } from "../../valueObjects/Cpf.vo";

export interface ClienteRepository {
    salvaCliente(cliente: Cliente): Promise<Cliente>;
    buscaClientePorId(id: number): Promise<Cliente | undefined>
    buscaClientePorCpf(cpf: Cpf): Promise<Cliente | undefined>
}