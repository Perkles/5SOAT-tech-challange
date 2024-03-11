import { PedidoRepository } from "../../core/applications/ports/Pedido.repository";
import { Pedido } from "../../core/domain/entities/Pedido";
import { AdapterGateway, GatewayDatasources } from "./interface/Gateway.interface";

export class PedidoAdapterGateway implements AdapterGateway {
    
    datasource: GatewayDatasources;

    constructor(datasource: GatewayDatasources) {
        this.datasource = datasource;
    }

    async novoPedido(pedido: Pedido): Promise<boolean> {
        return await (this.datasource as PedidoRepository).salvaPedido(pedido)
    }
}