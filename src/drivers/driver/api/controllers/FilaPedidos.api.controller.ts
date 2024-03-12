import {Request, Response} from 'express';
import { DomainException } from '../../../../core/domain/base/Domain.exception';
import { FilaPedidosAdapterController } from '../../../../adapters/controllers/FilaPedidos.adapter.controller';
import { FilaPedidosRepository } from '../../../../core/domain/base/ports/FilaPedidos.repository';

export class FilaPedidosApiController {
    
    constructor(private readonly filaPedidoRepository: FilaPedidosRepository) { }

    async listaPedidosParaAcompanhamento(request: Request, response: Response) {
        try{
            const listaDePedidos = await FilaPedidosAdapterController.listaPedidosParaAcompanhamento(this.filaPedidoRepository)
            if(listaDePedidos && listaDePedidos.length > 0){
                response.status(200).json({listaDePedidos: listaDePedidos})
            }else{
                response.status(400).json({ message: "Nenhum pedido cadastrado na fila de pedidos" })
            }
        }catch(error){
            if(error instanceof DomainException){
                response.status(400).json({ message: error.message })
            }else {
                response.status(400).json({ message: "Falha adicionar pedido a fila de pedidos" })
            }
        }
    }
}