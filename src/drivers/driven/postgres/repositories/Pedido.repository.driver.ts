import { Pedido } from "../../../../core/domain/entities/Pedido";
import { PedidoMapperDb } from "../mappers/Pedido.mapper.db";
import { ProdutoMapperDb } from "../mappers/Produto.mapper.db";
import { PedidoModel } from "../models/Pedido.model";
import { ProdutoModel } from "../models/Produto.model";
import sequelize from "../config/Database.config";
import { ClienteModel } from "../models/Cliente.model";
import { StatusPedidoEnum } from "../../../../core/domain/valueObjects/enum/StatusPedido.enum";
import { PedidoRepository } from "../../../../core/domain/base/ports/Pedido.repository";

export default class PedidoRepositoryPostgresDriver implements PedidoRepository {

    async salvaPedido(pedido: Pedido): Promise<Pedido | undefined> {    
        const transaction = await sequelize.transaction();
        try {
            const novoPedido = await PedidoModel.create({
                "ClienteModelId": pedido.cliente.id,
                "status": pedido.retornaStatus(),
                "valorTotal": pedido.retornaValorTotal()
            })
            const produtosModel = ProdutoMapperDb.entitiesToModels(pedido.itens) as ProdutoModel[]
            await novoPedido.addProdutoModels(produtosModel)      
            await transaction.commit()
            return await this.buscaPedidoPorId(novoPedido.id)
        }catch(error){
            await transaction.rollback();
        }
    }
    
    async buscaPedidoPorId(id: number): Promise<Pedido | undefined> {
        // const pedidoModel = await PedidoModel.findByPk(novoPedido.id, {include: { all: true, nested: true } })
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

    async atualizaStatus(id: number, statusPedido: StatusPedidoEnum): Promise<boolean> {
        const linhasAfetadas = await PedidoModel.update({status: statusPedido}, {where: {id: id}})
        return new Promise((resolve) => {
            resolve(linhasAfetadas[0] > 0)
        })
    }
    
}