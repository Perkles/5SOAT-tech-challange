import {Request, Response} from 'express';
import { DomainException } from '../../../../core/domain/base/Domain.exception';
import { PedidoAdapterController } from '../../../../adapters/controllers/Pedido.adapter.controller';
import { PedidoMapperApi } from '../mappers/Pedido.mapper.api';
import { PedidoRepository } from '../../../../core/applications/ports/Pedido.repository';
import { ProdutoRepository } from '../../../../core/applications/ports/Produto.repository';
import { ClienteRepository } from '../../../../core/applications/ports/Cliente.repository';
import { UseCaseException } from '../../../../adapters/exceptions/UseCase.exception';
import { FilaPedidosRepository } from '../../../../core/applications/ports/FilaPedidos.repository';

export class PedidoApiController {
    
    constructor(private readonly pedidoRepository: PedidoRepository, readonly produtoRepository: ProdutoRepository, readonly clienteRepository: ClienteRepository, readonly filaPedidosRepository: FilaPedidosRepository) { }

    async novoPedido(request: Request, response: Response) {
        try{
            const novoPedido = await PedidoAdapterController.novoPedido(PedidoMapperApi.requestToDto(request), this.pedidoRepository, this.produtoRepository, this.clienteRepository)
            if(novoPedido){
                response.status(200).json({message: "Pedido Cadastrado", pedido: novoPedido})
            }
        }catch(error){
            if(error instanceof DomainException || error instanceof UseCaseException){
                response.status(400).json({ message: error.message })
            }else {
                response.status(400).json({ message: "Falha ao cadastrar produto" })
            }
        }
    }

    async atualizaAndamentoPedido(request: Request, response: Response) {
        try{
            const pedidoComStatusAtualizado = await PedidoAdapterController.atualizaAndamentoPedido(PedidoMapperApi.requestToAtualizacaoStatusPedidoDto(request), this.pedidoRepository, this.filaPedidosRepository)
            if(pedidoComStatusAtualizado){
                response.status(200).json({message: "Status atualizado"})
            }
        }catch(error){
            if(error instanceof DomainException || error instanceof UseCaseException){
                response.status(400).json({ message: error.message })
            }else {
                response.status(400).json({ message: "Falha ao atualizar status do pedido" })
            }
        }
    }
}