import { FilaPedidosRepository } from "../../../../core/domain/base/ports/FilaPedidos.repository";
import { FilaPedidos } from "../../../../core/domain/entities/FilaPedidos";
import { Pedido } from "../../../../core/domain/entities/Pedido";
import { FilaPedidosMapperDb } from "../mappers/FilaPedidos.mapper.db";
import { FilaPedidoModel } from "../models/FilaPedido.model";

export default class FilaPedidoRepositoryAdapter implements FilaPedidosRepository {

    async adicionaPedido(pedido: Pedido): Promise<boolean> {
        const filaPedido = await FilaPedidoModel.create({'PedidoModelId': pedido.id})
        return new Promise((resolve) => {
            resolve(true)
        });
    }
    
    async listaTodosPedidosDaFilaPedidos(): Promise<FilaPedidos[] | undefined> {
        const filaPedidos = await FilaPedidoModel.findAll({include: { all: true, nested: true }})
        return new Promise((resolve) => {
            if((Array.isArray(filaPedidos) && filaPedidos.length > 0)) {
                resolve(FilaPedidosMapperDb.modelsToEntities(filaPedidos) as FilaPedidos[])
            }else{
                resolve(undefined)
            }
        })
    }

    async buscaFilaPedidoBaseadoNoIdDoPedido(idPedido: number): Promise<FilaPedidos | undefined> {
        const pedidoExistenteNaFila =  await FilaPedidoModel.findOne({
            where: {
                PedidoModelId: idPedido
            },include : {
                all: true,
                nested: true
            }
        })
        return new Promise((resolve) => {
            resolve(pedidoExistenteNaFila ? FilaPedidosMapperDb.modelToEntity(pedidoExistenteNaFila) as FilaPedidos : undefined)
        })
    }

    async removePedidoDaFilaPedidos(idPedido: number): Promise<boolean> {
        await FilaPedidoModel.destroy({
            where: {
                PedidoModelId: idPedido
            }
        })
        return new Promise((resolve) => {
            resolve(true)
        });
    }
}