import { AssertionConcern } from "../base/AssertionConcern";
import { Entidade } from "../base/Entidade.interface";
import { Pedido } from "./Pedido";


export class Cliente extends AssertionConcern implements Entidade {
    filaPedidos: Pedido[]
    
    constructor(filaPedidos: Pedido[]) {
        super()

        this.filaPedidos = filaPedidos

        this.ValidaEntidade()
    }

    ValidaEntidade(): void {}
    
}