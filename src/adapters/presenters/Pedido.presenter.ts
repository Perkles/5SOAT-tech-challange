import { Pedido } from "../../core/domain/entities/Pedido";
import { NovoPedidoDto, PedidoDto } from "../../drivers/driver/api/dto/Pedido.dto";

export class PedidoPresenter {
    static entityToDto(pedido: Pedido): PedidoDto {
        return {} as PedidoDto
    }

    static entityToNovoPedidoDto(pedido: Pedido): NovoPedidoDto {
        return {
            idPedido: pedido.id,
            idCliente: pedido.cliente.id,
            statusPedido: pedido.retornaStatus()
        } as NovoPedidoDto
    }
}