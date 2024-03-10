import { ClienteRepository } from "../../core/applications/ports/Cliente.repository";
import { ClienteUseCase } from "../../core/domain/useCases/ClienteUseCase";
import { ClienteDTO, ClienteNomeEmailDTO } from "../../drivers/driver/api/dto/cliente.dto";
import { ClienteAdapterGateway } from "../gateways/Cliente.gateway";
import { ClientePresenter } from "../presenters/cliente.presenter";

export class ClienteAdapterController {

    static async CadastraPorCpf(cpf: string, clienteRepositoy: ClienteRepository) {
        const clienteGateway = new ClienteAdapterGateway(clienteRepositoy)
        const novoCliente = await ClienteUseCase.cadastraClientePorCpf(cpf, clienteGateway)
        return new Promise((resolve) => {
            resolve(novoCliente ? ClientePresenter.entityToDTO(novoCliente) as ClienteDTO : undefined)
        });
    }

    static async CadastraPorNomeEmail(clienteDTO: ClienteNomeEmailDTO, clienteRepositoy: ClienteRepository) {
        const clienteGateway = new ClienteAdapterGateway(clienteRepositoy)
        const novoCliente = await ClienteUseCase.cadastraClientePorNomeEmail(clienteDTO.nome, clienteDTO.email, clienteGateway)
        return new Promise((resolve) => {
            resolve(novoCliente ? ClientePresenter.entityToDTO(novoCliente) as ClienteDTO : undefined)
        });
    }

    static async BuscaClienteCpf(cpf: string, clienteRepository: ClienteRepository): Promise<ClienteDTO | undefined> {
        const clienteGateway = new ClienteAdapterGateway(clienteRepository)
        const clienteEncontrado = await ClienteUseCase.buscaClientePorCpf(cpf, clienteGateway)
        return new Promise((resolve) => {
            resolve(clienteEncontrado ? ClientePresenter.entityToDTO(clienteEncontrado) as ClienteDTO : undefined)
        });
    }
}