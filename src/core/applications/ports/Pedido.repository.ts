import { Pedido } from "../../domain/entities/Pedido";

export interface PedidoRepository {
    salvaPedido(pedido: Pedido): Promise<boolean>;
    buscaPedidoPorId(id: number): Promise<Pedido | undefined>;  
    listaPedidos(): Promise<Pedido[] | undefined>
}