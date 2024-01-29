import { Cliente } from "../../domain/entities/Cliente";
import { ClienteRepository } from "../ports/Cliente.repository";

export class ClienteService {
    constructor(private readonly clienteRepository: ClienteRepository) { }

    async cadastroNomeEmail(cliente: Cliente): Promise<Cliente> {
        let novoCliente = new Cliente({nome: cliente.nome, email: cliente.email})
        return await this.clienteRepository.salvaCliente(novoCliente);
    }

    async cadastroViaCpf(cliente: Cliente): Promise<Cliente> {
        let novoCliente = new Cliente({cpf: cliente.cpf})
        return await this.clienteRepository.salvaCliente(novoCliente);
    }

    async clienteAnonimo(cliente: Cliente): Promise<Cliente> {
        let novoCliente = new Cliente({})
        return await this.clienteRepository.salvaCliente(novoCliente);
    }
}