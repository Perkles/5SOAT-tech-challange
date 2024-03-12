import { Pedido } from "../../core/domain/entities/Pedido";
import { NovoPedidoDto, PedidoEntradaDto } from "../../drivers/driver/api/dto/Pedido.dto";

export class PedidoPresenter {
    static entityToDto(pedido: Pedido): PedidoEntradaDto {
        return {} as PedidoEntradaDto
    }

    static entityToNovoPedidoDto(pedido: Pedido): NovoPedidoDto {
        return {
            idPedido: pedido.id,
            idCliente: pedido.cliente.id,
            statusPedido: pedido.retornaStatus()
        } as NovoPedidoDto
    }
}