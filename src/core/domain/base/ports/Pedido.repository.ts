import { Pedido } from "../../entities/Pedido";
import { StatusPedidoEnum } from "../../valueObjects/enum/StatusPedido.enum";

export interface PedidoRepository {
    salvaPedido(pedido: Pedido): Promise<Pedido | undefined>;
    buscaPedidoPorId(id: number): Promise<Pedido | undefined>;  
    atualizaStatus(id:number, statusPedido: StatusPedidoEnum) : Promise<boolean>;  
    listaPedidos(): Promise<Pedido[] | undefined>
}