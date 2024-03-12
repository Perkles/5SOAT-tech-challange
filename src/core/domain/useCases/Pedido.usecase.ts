import { UseCaseException } from "../../../adapters/exceptions/UseCase.exception";
import { ClienteAdapterGateway } from "../../../adapters/gateways/Cliente.gateway";
import { FilaPedidosAdapterGateway } from "../../../adapters/gateways/FilaPedidos.gateway";
import { PedidoAdapterGateway } from "../../../adapters/gateways/Pedido.gateway";
import { ProdutoAdapterGateway } from "../../../adapters/gateways/Produto.gateway";
import { Pedido } from "../entities/Pedido";
import { Produto } from "../entities/Produto";
import { PedidoFactory } from "../factories/Pedido.factory";
import { StatusPedido } from "../valueObjects/StatusPedido.vo";
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
        if(!pedidoExistente) {
            throw new UseCaseException(`Pedido de ID: ${idPedido} inexistente`)
        }
        
        if(statusPedido === "aprovado"){
            await pedidoGateway.atualizaStatus(idPedido, new StatusPedido("recebido").retornaStatusPedidoEnum())
            await filaPedidosGateway.adicionaPedido(pedidoExistente)
        }else if(statusPedido === "reprovado"){
            await pedidoGateway.atualizaStatus(idPedido, new StatusPedido("pagamentoRejeitado").retornaStatusPedidoEnum())
        }
    }

    static async retornaPedidoPorId(idPedido: number, pedidoGateway: PedidoAdapterGateway) {
        return await pedidoGateway.retornaPedidoPorId(idPedido)
    }
}