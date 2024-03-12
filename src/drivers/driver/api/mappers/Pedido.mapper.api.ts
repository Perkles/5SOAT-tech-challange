import { Request } from 'express';
import { AtualizacaoStatusPedidoDto, PedidoCallbackDto, PedidoEntradaDto } from '../dto/Pedido.dto';

export class PedidoMapperApi {
    
    static requestToDto(request: Request): PedidoEntradaDto {
        return  {
            clienteId: request.body.clienteId,
            itens: request.body.itens
        }
    }
    
    // Mantido separado pois provavelmente o DTO do callback é diferente 
    static requestToPedidoCallbackDto(request: Request): PedidoCallbackDto {
        return  {
            idPedido: request.body.idPedido,
            statusPedido: request.body.status
        } as PedidoCallbackDto
    }

    static requestToAtualizacaoStatusPedidoDto(request: Request): AtualizacaoStatusPedidoDto {
        return  {
            idPedido: request.body.idPedido,
            statusPedido: request.body.status
        } as PedidoCallbackDto
    }
}