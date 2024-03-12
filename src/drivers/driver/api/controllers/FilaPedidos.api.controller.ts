import {Request, Response} from 'express';
import { FilaPedidosService } from "../../../../core/applications/services/FilaPedido.service";
import { DomainException } from '../../../../core/domain/base/Domain.exception';
import { FilaPedidosRepository } from '../../../../core/applications/ports/FilaPedidos.repository';

export class FilaPedidosApiController {
    
    constructor(private readonly filaPedidoRepository: FilaPedidosRepository) { }

    // async adicionaPedidoAFilaDePedidos(request: Request, response: Response) {
    //     try{
    //         await this.filaPedidoService.adicionaPedidoAFilaDePedidos(request.body.idPedido)
    //         response.status(200).json({message: "Pedido adicionado a fila de pedidos"})
    //     }catch(error){
    //         if(error instanceof DomainException){
    //             response.status(400).json({ message: error.message })
    //         }else {
    //             response.status(400).json({ message: "Falha adicionar pedido a fila de pedidos" })
    //         }
    //     }
    // }
}