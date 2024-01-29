import { Pedido } from "../../domain/entities/Pedido";

export interface FilaPedidosRepository {
    adicionaPedido(pedido: Pedido): Promise<boolean>
}