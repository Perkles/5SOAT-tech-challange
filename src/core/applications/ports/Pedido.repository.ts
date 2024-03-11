import { Pedido } from "../../domain/entities/Pedido";

export interface PedidoRepository {
    salvaPedido(pedido: Pedido): Promise<Pedido | undefined>;
    buscaPedidoPorId(id: number): Promise<Pedido | undefined>;  
    listaPedidos(): Promise<Pedido[] | undefined>
}