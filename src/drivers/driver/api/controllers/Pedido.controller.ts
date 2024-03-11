import {Request, Response} from 'express';
import { DomainException } from '../../../../core/domain/base/Domain.exception';
import { PedidoAdapterController } from '../../../../adapters/controllers/Pedido.controller';
import { PedidoMapperApi } from '../mappers/Pedido.mapper.api';
import { PedidoRepository } from '../../../../core/applications/ports/Pedido.repository';
import { ProdutoRepository } from '../../../../core/applications/ports/Produto.repository';
import { ClienteRepository } from '../../../../core/applications/ports/Cliente.repository';
import { UseCaseException } from '../../../../adapters/exceptions/UseCase.exception';

export class PedidoController {
    
    constructor(private readonly pedidoRepository: PedidoRepository, readonly produtoRepository: ProdutoRepository, readonly clienteRepository: ClienteRepository) { }

    async novoPedido(request: Request, response: Response) {
        try{
            const pedido = await PedidoAdapterController.novoPedido(PedidoMapperApi.requestToDto(request), this.pedidoRepository, this.produtoRepository, this.clienteRepository)
            response.status(200).json({message: "Pedido Cadastrado"})
        }catch(error){
            if(error instanceof DomainException || error instanceof UseCaseException){
                response.status(400).json({ message: error.message })
            }else {
                response.status(400).json({ message: "Falha ao cadastrar produto" })
            }
        }
    }

    // async listaPedidos(request: Request, response: Response) {
    //     try{
    //         const pedidos = await this.pedidoService.listarPedidos()
    //         response.status(200).json({pedidos: pedidos})
    //     }catch(error){
    //         if(error instanceof DomainException){
    //             response.status(400).json({ message: error.message })
    //         }else {
    //             response.status(400).json({ message: "Falha ao buscar pedidos" })
    //         }
    //     }
    // }
}