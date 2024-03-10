import {Request, Response} from 'express';
import { PedidoService } from "../../../../core/applications/services/Pedido.service";
import { DomainException } from '../../../../core/domain/base/Domain.exception';

export class PedidoController {
    
    constructor(private readonly pedidoService: PedidoService) { }
    
    async listaPedidos(request: Request, response: Response) {
        try{
            const pedidos = await this.pedidoService.listarPedidos()
            response.status(200).json({pedidos: pedidos})
        }catch(error){
            if(error instanceof DomainException){
                response.status(400).json({ message: error.message })
            }else {
                response.status(400).json({ message: "Falha ao buscar pedidos" })
            }
        }
    }

    async novoPedido(request: Request, response: Response) {
        try{
            await this.pedidoService.cadastraPedido(request.body.clienteId, request.body.itens)
            response.status(200).json({message: "Pedido Cadastrado"})
        }catch(error){
            if(error instanceof DomainException){
                response.status(400).json({ message: error.message })
            }else {
                response.status(400).json({ message: "Falha ao cadastrar produto" })
            }
        }
    }
}