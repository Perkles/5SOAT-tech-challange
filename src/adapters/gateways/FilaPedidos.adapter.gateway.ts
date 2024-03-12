import { FilaPedidosRepository } from "../../core/domain/base/ports/FilaPedidos.repository";
import { FilaPedidos } from "../../core/domain/entities/FilaPedidos";
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

    async listaTodosPedidosDaFilaPedidos(): Promise<FilaPedidos[] | undefined> {
        return await (this.datasource as FilaPedidosRepository).listaTodosPedidosDaFilaPedidos()
    }  
    
    async buscaFilaPedidoBaseadoNoIdDoPedido(idPedido: number): Promise<FilaPedidos | undefined> {
        return await (this.datasource as FilaPedidosRepository).buscaFilaPedidoBaseadoNoIdDoPedido(idPedido)
    }  

    async removePedidoDaFilaPedidos(idPedido: number): Promise<boolean>{
        return await (this.datasource as FilaPedidosRepository).removePedidoDaFilaPedidos(idPedido)
    }
}