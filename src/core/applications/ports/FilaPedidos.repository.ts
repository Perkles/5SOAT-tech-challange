import { FilaPedidos } from "../../domain/entities/FilaPedidos";
import { Pedido } from "../../domain/entities/Pedido";

export interface FilaPedidosRepository {
    adicionaPedido(pedido: Pedido): Promise<boolean>
    listaTodosPedidosDaFilaPedidos(): Promise<FilaPedidos[] | undefined>
}