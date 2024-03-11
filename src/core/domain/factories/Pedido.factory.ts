import { Cliente } from "../entities/Cliente";
import { Pedido } from "../entities/Pedido";
import { Produto } from "../entities/Produto";
import { StatusPedido } from "../valueObjects/StatusPedido.vo";

export class PedidoFactory {
    
    static montaNovoPedido(cliente: Cliente, produtos: Produto[]) : Pedido {
        return new Pedido(produtos, cliente, new StatusPedido("pagamentoPendente").retornaStatusPedidoEnum())
    }
}