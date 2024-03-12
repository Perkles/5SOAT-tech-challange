import { ClienteRepository } from "../../core/domain/base/ports/Cliente.repository";
import { Cliente } from "../../core/domain/entities/Cliente";
import { Cpf } from "../../core/domain/valueObjects/Cpf.vo";
import { AdapterGateway, GatewayDatasources } from "./interface/Gateway.interface";

export class ClienteAdapterGateway implements AdapterGateway {

    datasource: GatewayDatasources;

    constructor(datasource: GatewayDatasources) {
        this.datasource = datasource;
    }

    async buscaPorCpf(cpf: Cpf): Promise<Cliente | undefined> {
        return await (this.datasource as ClienteRepository).buscaClientePorCpf(cpf)
    }

    async salvaCliente(cliente: Cliente): Promise<Cliente> {
        return await (this.datasource as ClienteRepository).salvaCliente(cliente)
    }

    async buscaClientePorId(id: number): Promise<Cliente | undefined> {
        return await (this.datasource as ClienteRepository).buscaClientePorId(id)
    }
}