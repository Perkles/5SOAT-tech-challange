import { AssertionConcern } from "../base/AssertionConcern";
import { Entidade } from "../base/Entidade.interface";
import { Pedido } from "./Pedido";


export class FilaPedidos extends AssertionConcern implements Entidade {
    pedido: Pedido
    dataInclusao: Date
    ultimaAtualizacao: Date

    constructor(pedido: Pedido, dataInclusao: Date, ultimaAtualizacao: Date) {
        super()

        this.pedido = pedido
        this.dataInclusao = dataInclusao
        this.ultimaAtualizacao = ultimaAtualizacao
        this.ValidaEntidade()
    }

    ValidaEntidade(): void {}
    
}