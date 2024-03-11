import { Cliente } from "../entities/Cliente";
import { Pedido } from "../entities/Pedido";
import { Produto } from "../entities/Produto";

export class PedidoFactory {
    
    static montaPedido(cliente: Cliente, produtos: Produto[]) : Pedido {
        return new Pedido(produtos, cliente)
    }
}