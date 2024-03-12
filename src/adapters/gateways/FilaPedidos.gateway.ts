import { FilaPedidosRepository } from "../../core/applications/ports/FilaPedidos.repository";
import { Pedido } from "../../core/domain/entities/Pedido";
import { AdapterGateway, GatewayDatasources } from "./interface/Gateway.interface";

export class FilaPedidosAdapterGateway implements AdapterGateway {
    
    datasource: GatewayDatasources;
    
    constructor(datasource: GatewayDatasources) {
        this.datasource = datasource;
    }

    async adicionaPedido(pedido: Pedido) {
        return await (this.datasource as FilaPedidosRepository).adicionaPedido(pedido)
    }    
}