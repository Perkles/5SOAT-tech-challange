import { Request } from 'express';
import { PedidoCallbackDto, PedidoEntradaDto } from '../dto/Pedido.dto';

export class PedidoMapperApi {
    
    static requestToDto(request: Request): PedidoEntradaDto {
        return  {
            clienteId: request.body.clienteId,
            itens: request.body.itens
        }
    }

    static requestToPedidoCallbackDto(request: Request): PedidoCallbackDto {
        return  {
            idPedido: request.body.idPedido,
            statusPedido: request.body.status
        } as PedidoCallbackDto
    }
}