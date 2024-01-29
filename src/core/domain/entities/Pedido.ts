import { AssertionConcern } from "../base/AssertionConcern"
import { Entidade } from "../base/Entidade.interface"
import { StatusPedidoEnum } from "../valueObjects/enum/StatusPedido.enum"
import { Cliente } from "./Cliente"
import { Produto } from "./Produto"

export class Pedido extends AssertionConcern implements Entidade {
    id?: number
    itens: Produto[]
    cliente: Cliente
    private status: StatusPedidoEnum
    private valorTotal: number
    
    constructor(itens: Produto[], cliente: Cliente, id?: number){
        super()
        
        this.id = id
        this.itens = itens
        this.cliente = cliente
        this.status = StatusPedidoEnum.recebido
        this.valorTotal = this.calculaValorTotal(this.itens)

        this.ValidaEntidade()
    }

    ValidaEntidade(): void {
        Pedido.AtributoListaNaoPodeSerVazio(this.itens, "Um pedido precisa ter um ou mais Intens")
        Pedido.AtributoNaoPodeSerVazio(this.cliente, "Um pedido precisa ter um Cliente")
        Pedido.AtributoNumericoNaoPodeSerNegativo(this.valorTotal, "Valor total do pedido nao pode ser negativo")
    }

    atualizaStatus(statusPedido: StatusPedidoEnum){
        this.status = statusPedido
    }
    
    retornaStatus(): StatusPedidoEnum {
        return this.status
    }
    
    retornaValorTotal(): number {
        return this.valorTotal
    }

    calculaValorTotal(itens: Produto[]): number {
        return itens.reduce((acumulador, item) => item.preco + acumulador , 0)
    }
}