import { PedidoRepository } from "../../../../core/applications/ports/Pedido.repository";
import { Pedido } from "../../../../core/domain/entities/Pedido";
import { PedidoMapperDb } from "../mappers/Pedido.mapper.db";
import { ProdutoMapperDb } from "../mappers/Produto.mapper.db";
import { PedidoModel } from "../models/Pedido.model";
import { ProdutoModel } from "../models/Produto.model";
import sequelize from "../config/Database.config";
import { ClienteModel } from "../models/Cliente.model";


export default class PedidoRepositoryPostgresDriver implements PedidoRepository {
    
    async salvaPedido(pedido: Pedido): Promise<boolean> {    
        const transaction = await sequelize.transaction();
        try {
            const novoPedido = await PedidoModel.create({
                "ClienteModelId": pedido.cliente.id,
                "status": pedido.retornaStatus(),
                "valorTotal": pedido.retornaValorTotal()
            })
            const produtosModel = ProdutoMapperDb.entitiesToModels(pedido.itens) as ProdutoModel[]
            novoPedido.addProdutoModels(produtosModel)      
            transaction.commit()
        }catch(error){
            await transaction.rollback();
        }
        return new Promise((resolve) => {
            resolve(true)
        });
    }

    async buscaPedidoPorId(id: number): Promise<Pedido | undefined> {
        const pedidoModel = await PedidoModel.findByPk(id, {include: [ProdutoModel, ClienteModel]})
        return new Promise((resolve) => {
            resolve(pedidoModel ? PedidoMapperDb.modelToEntity(pedidoModel) as Pedido : undefined)
        });
    }
    
    async listaPedidos(): Promise<Pedido[] | undefined> {
        const pedidosModel = await PedidoModel.findAll({include: [ClienteModel, ProdutoModel]})
        return new Promise((resolve) => {
            resolve(PedidoMapperDb.modelsToEntities(pedidosModel) as Pedido[])
        })
    }
}