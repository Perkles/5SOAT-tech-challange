import {Request, Response} from 'express';
import { DomainException } from '../../../../core/domain/base/Domain.exception';
import { PedidoAdapterController } from '../../../../adapters/controllers/Pedido.adapter.controller';
import { PedidoMapperApi } from '../mappers/Pedido.mapper.api';
import { UseCaseException } from '../../../../adapters/exceptions/Usecase.exception';
import { ClienteRepository } from '../../../../core/domain/base/ports/Cliente.repository';
import { FilaPedidosRepository } from '../../../../core/domain/base/ports/FilaPedidos.repository';
import { PedidoRepository } from '../../../../core/domain/base/ports/Pedido.repository';
import { ProdutoRepository } from '../../../../core/domain/base/ports/Produto.repository';

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