import { UseCaseException } from "../../../adapters/exceptions/Usecase.exception";
import { ClienteAdapterGateway } from "../../../adapters/gateways/Cliente.adapter.gateway";
import { FilaPedidosAdapterGateway } from "../../../adapters/gateways/FilaPedidos.adapter.gateway";
import { PedidoAdapterGateway } from "../../../adapters/gateways/Pedido.adapter.gateway";
import { ProdutoAdapterGateway } from "../../../adapters/gateways/Produto.adapter.gateway";
import { Pedido } from "../entities/Pedido";
import { Produto } from "../entities/Produto";
import { PedidoFactory } from "../factories/Pedido.factory";
import { StatusPedido } from "../valueObjects/StatusPedido.vo";
import { StatusPedidoEnum } from "../valueObjects/enum/StatusPedido.enum";
import { ClienteUseCase } from "./Cliente.usecase";
import { ProdutoUseCase } from "./Produto.usecase";

export class PedidoUsecase {

    static async criaNovoPedido(idCliente: number, idProdutos: number[], pedidoGateway: PedidoAdapterGateway, produtoGateway: ProdutoAdapterGateway, clienteGateway: ClienteAdapterGateway): Promise<Pedido | undefined> {
        let produtos: Produto[] = []
        const clienteExistente = await ClienteUseCase.buscaClientePorId(idCliente, clienteGateway)
        if(!clienteExistente){
            throw new UseCaseException(`Cliente de ID: ${idCliente} inexistente`)
        }
        for await (const idProduto of idProdutos) {
            let produtoExistente = await ProdutoUseCase.buscaProdutoPorId(idProduto, produtoGateway)
            if(!produtoExistente){
                throw new UseCaseException(`Produto de ID: ${idProduto} inexistente`)
            }else{
                produtos.push(produtoExistente)
            }
        }
        const novoPedido = PedidoFactory.montaNovoPedido(clienteExistente, produtos)
        return await pedidoGateway.novoPedido(novoPedido)
    }

    static async atualizaStatusPagamentoCallbackHook(idPedido: number, statusPedido: string, pedidoGateway: PedidoAdapterGateway, filaPedidosGateway: FilaPedidosAdapterGateway) {
        const pedidoExistente = await this.retornaPedidoPorId(idPedido, pedidoGateway)
        if(statusPedido === "aprovado"){
            await pedidoGateway.atualizaStatus(idPedido, new StatusPedido("recebido").retornaStatusPedidoEnum())
            await filaPedidosGateway.adicionaPedido(pedidoExistente)
        }else if(statusPedido === "reprovado"){
            await pedidoGateway.atualizaStatus(idPedido, new StatusPedido("pagamentoRejeitado").retornaStatusPedidoEnum())
        }else{
            throw new UseCaseException(`Callback status invalido`)
        }
    }

    static async retornaPedidoPorId(idPedido: number, pedidoGateway: PedidoAdapterGateway) {
        const pedidoExistente = await pedidoGateway.retornaPedidoPorId(idPedido)
        if(!pedidoExistente) {
            throw new UseCaseException(`Pedido de ID: ${idPedido} inexistente`)
        }
        return pedidoExistente
    }

    static async atualizaAndamentoPedido(idPedido: number, statusPedido: string, filaPedidosGateway: FilaPedidosAdapterGateway, pedidoGateway: PedidoAdapterGateway): Promise<boolean> {
        const pedidoExistenteNaFilaDePedidos = await filaPedidosGateway.buscaFilaPedidoBaseadoNoIdDoPedido(idPedido)
        if(!pedidoExistenteNaFilaDePedidos){
            throw new UseCaseException(`Pedido de ID: ${idPedido} não consta na fila de pedidos`)
        }

        if(["pagamentoPendente", "pagamentoRejeitado", "pagamentoFinalizado", "recebido"].includes(statusPedido)){
            throw new UseCaseException(`Status: ${statusPedido} não pode ser atualizado diretamente`)
        }
        if(statusPedido === "finalizado"){
            const pedidoRemovido = await filaPedidosGateway.removePedidoDaFilaPedidos(idPedido)
            if(pedidoRemovido){
                return await pedidoGateway.atualizaStatus(pedidoExistenteNaFilaDePedidos.pedido.id!, new StatusPedido(statusPedido).retornaStatusPedidoEnum())
            }
        }
        return await pedidoGateway.atualizaStatus(pedidoExistenteNaFilaDePedidos.pedido.id!, new StatusPedido(statusPedido).retornaStatusPedidoEnum())
    }

    static async retornaStatusPagamento(idPedido: number, pedidoGateway: PedidoAdapterGateway): Promise<string> {
        const pedido = await this.retornaPedidoPorId(idPedido, pedidoGateway)
        if([StatusPedidoEnum.pagamentoPendente, StatusPedidoEnum.pagamentoRejeitado].includes(pedido.retornaStatus()) ){
            return pedido.retornaStatus()
        }else{
            return StatusPedidoEnum.pagamentoFinalizado
        }
    }
}