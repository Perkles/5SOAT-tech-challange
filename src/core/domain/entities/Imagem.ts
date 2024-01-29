import { AssertionConcern } from "../base/AssertionConcern"
import { Entidade } from "../base/Entidade.interface"

export class Imagem extends AssertionConcern implements Entidade {
    id?: number
    nome: string
    descricao: string
    url: string

    constructor(nome: string, descricao: string, url: string, id?: number) {
        super()
        
        this.id = id
        this.nome = nome, 
        this.descricao = descricao,
        this.url = url

        this.ValidaEntidade()
    }

    ValidaEntidade(): void {
        Imagem.AtributoNaoPodeSerVazio(this.nome, "Atributo nao pode ser vazio")
    }
}