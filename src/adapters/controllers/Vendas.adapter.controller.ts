import { FilaPedidosRepository } from "../../core/domain/base/ports/FilaPedidos.repository";
import { PedidoRepository } from "../../core/domain/base/ports/Pedido.repository";
import { PedidoUsecase } from "../../core/domain/useCases/Pedido.usecase";
import { PedidoCallbackDto } from "../../drivers/driver/api/dto/Pedido.dto";
import { FilaPedidosAdapterGateway } from "../gateways/FilaPedidos.adapter.gateway";
import { PedidoAdapterGateway } from "../gateways/Pedido.adapter.gateway";

export class VendasAdapterController {
    
    static async atualizaStatusPagamentoCallbackHook(pedidoCallbackDto: PedidoCallbackDto, pedidoRepository: PedidoRepository, filaPedidoRepository: FilaPedidosRepository) {
        await PedidoUsecase.atualizaStatusPagamentoCallbackHook(pedidoCallbackDto.idPedido, pedidoCallbackDto.statusPedido, new PedidoAdapterGateway(pedidoRepository),  new FilaPedidosAdapterGateway(filaPedidoRepository))
    }

    static async retornaStatusPagamento(idPedido: number, pedidoRepository: PedidoRepository): Promise<string> {
        const statusPedido = await PedidoUsecase.retornaStatusPagamento(idPedido, new PedidoAdapterGateway(pedidoRepository))
        return new Promise((resolve) => {
            resolve(statusPedido)
        });
    }
}