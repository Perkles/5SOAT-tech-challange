import { ClienteRepository } from "../../../../core/domain/base/ports/Cliente.repository";
import { Cliente } from "../../../../core/domain/entities/Cliente";
import { Cpf } from "../../../../core/domain/valueObjects/Cpf.vo";
import { ClienteMapperDb } from "../mappers/Cliente.mapper.db";
import { ClienteModel } from "../models/Cliente.model";

export default class ClienteRepositoryPostgresDriver implements ClienteRepository {

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

    async buscaClientePorCpf(cpf: Cpf): Promise<Cliente | undefined> {
        const clienteEncontrado = await ClienteModel.findOne({ where: { cpf: cpf.valor } });
        return new Promise((resolve) => {
            resolve(clienteEncontrado ? ClienteMapperDb.modelToEntity(clienteEncontrado as ClienteModel) as Cliente : undefined)
        })
    }
}