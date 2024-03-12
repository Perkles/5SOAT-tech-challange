import { PedidoRepository } from "../../core/domain/base/ports/Pedido.repository";
import { Pedido } from "../../core/domain/entities/Pedido";
import { StatusPedidoEnum } from "../../core/domain/valueObjects/enum/StatusPedido.enum";
import { AdapterGateway, GatewayDatasources } from "./interface/Gateway.interface";

export class PedidoAdapterGateway implements AdapterGateway {
    
    datasource: GatewayDatasources;

    constructor(datasource: GatewayDatasources) {
        this.datasource = datasource;
    }

    async novoPedido(pedido: Pedido): Promise<Pedido | undefined> {
        return await (this.datasource as PedidoRepository).salvaPedido(pedido)
    }

    async retornaPedidoPorId(idPedido: number): Promise<Pedido | undefined> {
        return await (this.datasource as PedidoRepository).buscaPedidoPorId(idPedido)
    }

    async atualizaStatus(idPedido: number, statusPedido: StatusPedidoEnum): Promise<boolean> {
        return await (this.datasource as PedidoRepository).atualizaStatus(idPedido, statusPedido)
    }
}