import { Pedido } from "../../core/domain/entities/Pedido";
import { PedidoDto } from "../../drivers/driver/api/dto/Pedido.dto";

export class PedidoPresenter {
    static entityToDto(pedido: Pedido): PedidoDto {
        return {} as PedidoDto
    }
}