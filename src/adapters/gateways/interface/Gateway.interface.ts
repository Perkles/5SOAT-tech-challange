import { ClienteRepository } from "../../../core/applications/ports/Cliente.repository";
import { FilaPedidosRepository } from "../../../core/applications/ports/FilaPedidos.repository";
import { PedidoRepository } from "../../../core/applications/ports/Pedido.repository";
import { ProdutoRepository } from "../../../core/applications/ports/Produto.repository";

export type GatewayDatasources = ClienteRepository | FilaPedidosRepository | PedidoRepository | ProdutoRepository

export interface AdapterGateway {
    datasource: GatewayDatasources
}