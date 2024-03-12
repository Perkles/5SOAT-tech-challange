import { FilaPedidosRepository } from "../../core/applications/ports/FilaPedidos.repository";
import { PedidoRepository } from "../../core/applications/ports/Pedido.repository";
import { PedidoUsecase } from "../../core/domain/useCases/Pedido.usecase";
import { PedidoCallbackDto } from "../../drivers/driver/api/dto/Pedido.dto";
import { FilaPedidosAdapterGateway } from "../gateways/FilaPedidos.gateway";
import { PedidoAdapterGateway } from "../gateways/Pedido.gateway";

export class VendasAdapterController {
    
    static async atualizaStatusPagamentoCallbackHook(pedidoCallbackDto: PedidoCallbackDto, pedidoRepository: PedidoRepository, filaPedidoRepository: FilaPedidosRepository) {
        await PedidoUsecase.atualizaStatusPagamentoCallbackHook(pedidoCallbackDto.idPedido, pedidoCallbackDto.statusPedido, new PedidoAdapterGateway(pedidoRepository),  new FilaPedidosAdapterGateway(filaPedidoRepository))
    }
}