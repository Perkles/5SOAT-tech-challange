import { AssertionConcern } from "../base/AssertionConcern"
import { Entidade } from "../base/Entidade.interface"
import { Cpf } from "../valueObjects/Cpf.vo"
import { Email } from "../valueObjects/Email.vo"

export class Cliente extends AssertionConcern implements Entidade {
    id?: number
    cpf?: Cpf
    nome?: string
    email?: Email   

    constructor(partial: Partial<Cliente>) {
        super()
        
        Object.assign(this, partial);

        this.ValidaEntidade()
    }
    
    ValidaEntidade(): void {}
}