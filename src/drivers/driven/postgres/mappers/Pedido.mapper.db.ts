import { Entidade } from "../../../../core/domain/base/Entidade.interface";
import { PedidoModel } from "../models/Pedido.model";
import { Pedido } from "../../../../core/domain/entities/Pedido";
import { Model } from "sequelize";
import { ProdutoMapperDb } from "./Produto.mapper.db";
import { Produto } from "../../../../core/domain/entities/Produto";
import { ClienteMapperDb } from "./Cliente.mapper.db";


export class PedidoMapperDb {
    
    static modelsToEntities(models: PedidoModel[]): Entidade[] {
        let pedidosEntidade: Pedido[] = [];
        models.forEach(model => {
            const pedidoModel = model.get();
            pedidosEntidade.push(
                new Pedido(
                    ProdutoMapperDb.modelsToEntities(Object.values(pedidoModel.ProdutoModels)) as Produto[],
                    ClienteMapperDb.modelToEntity(pedidoModel.ClienteModel) ,
                    pedidoModel.id
                )
            );
        });
        return pedidosEntidade;
    }

    static modelToEntity(model: PedidoModel): Entidade {
        const pedidoModel = model.get();
        return new Pedido(
            ProdutoMapperDb.modelsToEntities(Object.values(pedidoModel.ProdutoModels)) as Produto[],
            ClienteMapperDb.modelToEntity(pedidoModel.ClienteModel),
            pedidoModel.status,
            model.id
        )   
    }

    static entityToModel(pedido: Pedido): Model {
        return PedidoModel.build(
            {
                itens: pedido.itens,
                cliente: pedido.cliente,
                valorTotal: pedido.retornaValorTotal(),
                status: pedido.retornaStatus()
            }
        )
    }

}
