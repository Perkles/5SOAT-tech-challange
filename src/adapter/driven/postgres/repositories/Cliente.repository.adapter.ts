import { ClienteRepository } from "../../../../core/applications/ports/Cliente.repository";
import { Cliente } from "../../../../core/domain/entities/Cliente";
import { ClienteMapperDb } from "../mappers/Cliente.mapper.db";
import { ClienteModel } from "../models/Cliente.model";

export default class ClienteRepositoryAdapter implements ClienteRepository {

    async buscaClientePorId(id: number): Promise<Cliente | undefined> {
        const clienteModel = await ClienteModel.findByPk(id)
        return new Promise((resolve) => {
            resolve(clienteModel ? ClienteMapperDb.modelToEntity(clienteModel) as Cliente : undefined)
        });
    }

    async salvaCliente(cliente: Cliente): Promise<Cliente> {
        const novoCliente = ClienteMapperDb.entityToModel(cliente)
        await novoCliente.save()
        return new Promise((resolve) => {
            resolve(ClienteMapperDb.modelToEntity(novoCliente as ClienteModel) as Cliente)
        })
    }

}