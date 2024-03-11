import { ClienteRepository } from "../../core/applications/ports/Cliente.repository";
import { PedidoRepository } from "../../core/applications/ports/Pedido.repository";
import { ProdutoRepository } from "../../core/applications/ports/Produto.repository";
import { PedidoUsecase } from "../../core/domain/useCases/Pedido.usecase";
import { NovoPedidoDto, PedidoDto } from "../../drivers/driver/api/dto/Pedido.dto";
import { ClienteAdapterGateway } from "../gateways/Cliente.gateway";
import { PedidoAdapterGateway } from "../gateways/Pedido.gateway";
import { ProdutoAdapterGateway } from "../gateways/Produto.gateway";
import { PedidoPresenter } from "../presenters/Pedido.presenter";

export class PedidoAdapterController {

    static async novoPedido(pedidoDto: PedidoDto, pedidoRepository: PedidoRepository, produtoRepository: ProdutoRepository, clienteRepository: ClienteRepository): Promise<NovoPedidoDto | undefined> {
        const novoPedido = await PedidoUsecase.criaNovoPedido(pedidoDto.clienteId, pedidoDto.itens, new PedidoAdapterGateway(pedidoRepository), new ProdutoAdapterGateway(produtoRepository), new ClienteAdapterGateway(clienteRepository))
        return new Promise((resolve) => {
            resolve(novoPedido ? PedidoPresenter.entityToNovoPedidoDto(novoPedido) : undefined)
        });
    }
    
}