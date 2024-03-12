import { ClienteRepository } from "../../core/domain/base/ports/Cliente.repository";
import { ClienteUseCase } from "../../core/domain/useCases/Cliente.usecase";
import { ClienteDTO, ClienteNomeEmailDTO } from "../../drivers/driver/api/dto/Cliente.dto";
import { ClienteAdapterGateway } from "../gateways/Cliente.adapter.gateway";
import { ClientePresenter } from "../presenters/Cliente.adapter.presenter";

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