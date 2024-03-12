import { ClienteRepository } from "../../core/applications/ports/Cliente.repository";
import { FilaPedidosRepository } from "../../core/applications/ports/FilaPedidos.repository";
import { PedidoRepository } from "../../core/applications/ports/Pedido.repository";
import { ProdutoRepository } from "../../core/applications/ports/Produto.repository";
import { PedidoUsecase } from "../../core/domain/useCases/Pedido.usecase";
import { AtualizacaoStatusPedidoDto, NovoPedidoDto, PedidoEntradaDto } from "../../drivers/driver/api/dto/Pedido.dto";
import { ClienteAdapterGateway } from "../gateways/Cliente.gateway";
import { FilaPedidosAdapterGateway } from "../gateways/FilaPedidos.gateway";
import { PedidoAdapterGateway } from "../gateways/Pedido.gateway";
import { ProdutoAdapterGateway } from "../gateways/Produto.gateway";
import { PedidoPresenter } from "../presenters/Pedido.presenter";

export class PedidoAdapterController {

    static async novoPedido(pedidoDto: PedidoEntradaDto, pedidoRepository: PedidoRepository, produtoRepository: ProdutoRepository, clienteRepository: ClienteRepository): Promise<NovoPedidoDto | undefined> {
        const novoPedido = await PedidoUsecase.criaNovoPedido(pedidoDto.clienteId, pedidoDto.itens, new PedidoAdapterGateway(pedidoRepository), new ProdutoAdapterGateway(produtoRepository), new ClienteAdapterGateway(clienteRepository))
        return new Promise((resolve) => {
            resolve(novoPedido ? PedidoPresenter.entityToNovoPedidoDto(novoPedido) : undefined)
        });
    }
    
    static async atualizaAndamentoPedido(atualizacaoStatusPedidoDto: AtualizacaoStatusPedidoDto, pedidoRepository: PedidoRepository, filaPedidosRepository: FilaPedidosRepository): Promise<boolean> {
        const pedidoAtualizado = await PedidoUsecase.atualizaAndamentoPedido(atualizacaoStatusPedidoDto.idPedido, atualizacaoStatusPedidoDto.statusPedido, new FilaPedidosAdapterGateway(filaPedidosRepository), new PedidoAdapterGateway(pedidoRepository))
        return new Promise((resolve) => {
            resolve(pedidoAtualizado)
        });
    }
}