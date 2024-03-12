import { ClienteRepository } from "../../core/domain/base/ports/Cliente.repository";
import { FilaPedidosRepository } from "../../core/domain/base/ports/FilaPedidos.repository";
import { PedidoRepository } from "../../core/domain/base/ports/Pedido.repository";
import { ProdutoRepository } from "../../core/domain/base/ports/Produto.repository";
import { PedidoUsecase } from "../../core/domain/useCases/Pedido.usecase";
import { AtualizacaoStatusPedidoDto, NovoPedidoDto, PedidoEntradaDto } from "../../drivers/driver/api/dto/Pedido.dto";
import { ClienteAdapterGateway } from "../gateways/Cliente.adapter.gateway";
import { FilaPedidosAdapterGateway } from "../gateways/FilaPedidos.adapter.gateway";
import { PedidoAdapterGateway } from "../gateways/Pedido.adapter.gateway";
import { ProdutoAdapterGateway } from "../gateways/Produto.adapter.gateway";
import { PedidoPresenter } from "../presenters/Pedido.adapter.presenter";

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