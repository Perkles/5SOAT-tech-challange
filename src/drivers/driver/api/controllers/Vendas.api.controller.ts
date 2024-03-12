import {Request, Response} from 'express';
import { DomainException } from '../../../../core/domain/base/Domain.exception';
import { PedidoMapperApi } from '../mappers/Pedido.mapper.api';
import { UseCaseException } from '../../../../adapters/exceptions/UseCase.exception';
import { PedidoRepository } from '../../../../core/applications/ports/Pedido.repository';
import { VendasAdapterController } from '../../../../adapters/controllers/Vendas.adapter.controller';
import { FilaPedidosRepository } from '../../../../core/applications/ports/FilaPedidos.repository';

export class VendasApiController {
    
    constructor(private readonly pedidoRepository: PedidoRepository, readonly filaPedidoRepository: FilaPedidosRepository) {} 

    async callbackHook(request: Request, response: Response) {
        try{
            await VendasAdapterController.atualizaStatusPagamentoCallbackHook(PedidoMapperApi.requestToPedidoCallbackDto(request), this.pedidoRepository, this.filaPedidoRepository)
            response.status(200).json({message: "Pedido atualizado"})
        }catch(error){
            if(error instanceof DomainException || error instanceof UseCaseException){
                response.status(400).json({ message: error.message })
            }else {
                response.status(400).json({ message: "Falha ao cadastrar produto" })
            }
        }
    }

    async retornaStatusPagamento(request: Request, response: Response) {
        try{
            const statusPedido = await VendasAdapterController.retornaStatusPagamento(parseInt(request.params.idPedido), this.pedidoRepository)
            response.status(200).json({statusPagamento: statusPedido})
        }catch(error){
            if(error instanceof DomainException || error instanceof UseCaseException){
                response.status(400).json({ message: error.message })
            }else {
                response.status(400).json({ message: "Falha ao cadastrar produto" })
            }
        }
    }
}