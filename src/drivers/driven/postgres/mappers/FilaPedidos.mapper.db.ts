import { Model } from "sequelize";
import { FilaPedidos } from "../../../../core/domain/entities/FilaPedidos";
import { FilaPedidoModel } from "../models/FilaPedido.model";
import { Entidade } from "../../../../core/domain/base/Entidade.interface";
import { PedidoMapperDb } from "./Pedido.mapper.db";
import { Pedido } from "../../../../core/domain/entities/Pedido";

export class FilaPedidosMapperDb {
    static modelToEntity(model: FilaPedidoModel): Entidade {
        const filaPedidoModel = model.get();
        return new FilaPedidos(
            PedidoMapperDb.modelToEntity(filaPedidoModel.PedidoModel) as Pedido,
            filaPedidoModel.createdAt,
            filaPedidoModel.updatedAt
        )
    }

    static modelsToEntities(model: FilaPedidoModel[]): Entidade[] {
        let filaPedidosModels: FilaPedidos[] = []
        model.forEach(model => {
            const filaPedidoModel = model.get();
            filaPedidosModels.push(
                new FilaPedidos(
                    PedidoMapperDb.modelToEntity(filaPedidoModel.PedidoModel) as Pedido,
                    filaPedidoModel.createdAt,
                    filaPedidoModel.updatedAt
                )
            )
        });
        return filaPedidosModels
    }

    static entityToModel(pedido: FilaPedidos): Model {
        return FilaPedidoModel.build(
            {
                
            }
        )
    }
}