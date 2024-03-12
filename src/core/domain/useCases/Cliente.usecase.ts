import { UseCaseException } from "../../../adapters/exceptions/Usecase.exception";
import { ClienteAdapterGateway } from "../../../adapters/gateways/Cliente.adapter.gateway";
import { Cliente } from "../entities/Cliente";
import { Cpf } from "../valueObjects/Cpf.vo";
import { Email } from "../valueObjects/Email.vo";


export class ClienteUseCase {
    static async cadastraClientePorCpf(cpf: string, clienteGateway: ClienteAdapterGateway): Promise<Cliente> {
        const clienteExistente = await ClienteUseCase.buscaClientePorCpf(cpf, clienteGateway);
        if(clienteExistente){
            throw new UseCaseException(`Um usuário com CPF: ${cpf} ja existe `)
        }
        const cliente = new Cliente({
            cpf: new Cpf(cpf)
        });
        return await clienteGateway.salvaCliente(cliente);
    }

    static async cadastraClientePorNomeEmail(nome: string, email: string, clienteGateway: ClienteAdapterGateway): Promise<Cliente> {
        const cliente = new Cliente({
            nome: nome,
            email: new Email(email)
        });
        return await clienteGateway.salvaCliente(cliente);
    }

    static async buscaClientePorCpf(cpf: string, clienteGateway: ClienteAdapterGateway): Promise<Cliente | undefined> {
        return await clienteGateway.buscaPorCpf(new Cpf(cpf));
    }

    static async buscaClientePorId(id: number, clienteGateway: ClienteAdapterGateway): Promise<Cliente | undefined> {
        return await clienteGateway.buscaClientePorId(id);
    }
}
