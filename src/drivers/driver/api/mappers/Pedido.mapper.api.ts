import { Request } from 'express';
import { PedidoDto } from '../dto/Pedido.dto';

export class PedidoMapperApi {
    
    static requestToDto(request: Request): PedidoDto {
        // if(request.body.itens && Array.isArray(request.body.itens)){
        //     const itens = request.body.itens.map(item => return )
        // }
        return  {
            clienteId: request.body.clienteId,
            itens: request.body.itens
        }
    }
}