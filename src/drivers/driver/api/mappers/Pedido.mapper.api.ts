import { Request } from 'express';
import { PedidoDto } from '../dto/Pedido.dto';

export class PedidoMapperApi {
    
    static requestToDto(request: Request): PedidoDto {
        return  {
            clienteId: request.body.clienteId,
            itens: request.body.itens
        }
    }
}