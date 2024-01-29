import { Model } from "sequelize";
import { Cliente } from "../../../../core/domain/entities/Cliente";
import { ClienteModel } from "../models/Cliente.model";
import { Entidade } from "../../../../core/domain/base/Entidade.interface";

export class ClienteMapperDb {
    
    static entityToModel(cliente: Cliente): Model {
        return ClienteModel.build(
            {
                cpf: cliente.cpf?.valor,
                nome: cliente.nome,
                email: cliente.email?.valor
            }
        )
    }

    static modelToEntity(cliente: ClienteModel): Entidade {
        const clienteModel = cliente.get()
        return new Cliente(
            {   
                id: clienteModel.id,
                cpf: clienteModel.cpf,
                nome: clienteModel.nome,
                email: clienteModel.email
            }
        )
    }
}