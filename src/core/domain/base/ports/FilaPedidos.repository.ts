import { FilaPedidos } from "../../entities/FilaPedidos"
import { Pedido } from "../../entities/Pedido"

export interface FilaPedidosRepository {
    adicionaPedido(pedido: Pedido): Promise<boolean>
    listaTodosPedidosDaFilaPedidos(): Promise<FilaPedidos[] | undefined>
    buscaFilaPedidoBaseadoNoIdDoPedido(idPedido: number) : Promise<FilaPedidos | undefined>
    removePedidoDaFilaPedidos(idPedido: number): Promise<boolean>
}