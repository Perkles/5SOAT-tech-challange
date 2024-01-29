import { DomainException } from "../../domain/base/Domain.exception";
import { Pedido } from "../../domain/entities/Pedido";
import { Produto } from "../../domain/entities/Produto";
import { ClienteRepository } from "../ports/Cliente.repository";
import { PedidoRepository } from "../ports/Pedido.repository";
import { ProdutoRepository } from "../ports/Produto.repository";

export class PedidoService {
    constructor(private readonly pedidoRepository: PedidoRepository,
         private readonly clienteRepository: ClienteRepository,
         private readonly produtoRepository: ProdutoRepository) { }

    async cadastraPedido(idCliente: number, idProdutos: number[]): Promise<boolean> {
        let produtos: Produto[] = []
        let clienteExistente = await this.clienteRepository.buscaClientePorId(idCliente)
        if(!clienteExistente){
            throw new DomainException(`Cliente com identificador ${idCliente} inexistente`)
        }
        for await (const idProduto of idProdutos) {
            let produtoExistente = await this.produtoRepository.buscaProdutoPorId(idProduto)
            if(!produtoExistente){
                throw new DomainException(`Produto com identificador ${idProduto} inexistente`)
            }else{
                produtos.push(produtoExistente)
            }
        }
        let novoPedido = new Pedido(
            produtos,
            clienteExistente
        )
        return this.pedidoRepository.salvaPedido(novoPedido);
    }

    async listarPedidos(): Promise<Pedido[] | undefined> {
        return this.pedidoRepository.listaPedidos()
    }
    
}