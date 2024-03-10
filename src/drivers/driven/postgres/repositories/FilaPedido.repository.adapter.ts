import { FilaPedidosRepository } from "../../../../core/applications/ports/FilaPedidos.repository";
import { Pedido } from "../../../../core/domain/entities/Pedido";
import { FilaPedidoModel } from "../models/FilaPedido.model";

export default class FilaPedidoRepositoryAdapter implements FilaPedidosRepository {
    
    async adicionaPedido(pedido: Pedido): Promise<boolean> {
        await FilaPedidoModel.create({"PedidoModelId" : pedido.id})
        return new Promise((resolve) => {
            resolve(true)
        });
    }

}