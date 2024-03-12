import { ClienteRepository } from "../../../core/domain/base/ports/Cliente.repository"
import { FilaPedidosRepository } from "../../../core/domain/base/ports/FilaPedidos.repository"
import { PedidoRepository } from "../../../core/domain/base/ports/Pedido.repository"
import { ProdutoRepository } from "../../../core/domain/base/ports/Produto.repository"

export type GatewayDatasources = ClienteRepository | FilaPedidosRepository | PedidoRepository | ProdutoRepository

export interface AdapterGateway {
    datasource: GatewayDatasources
}