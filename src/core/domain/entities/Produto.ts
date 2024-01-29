import { AssertionConcern } from "../base/AssertionConcern"
import { Entidade } from "../base/Entidade.interface"
import { CategoriaProdutoEnum } from "../valueObjects/enum/CategoriaProduto.enum"
import { Imagem } from "./Imagem"

export class Produto extends AssertionConcern implements Entidade {
    id?: number
    nome: string
    descricao: string
    categoria: CategoriaProdutoEnum
    preco: number
    tempoDePreparo: number
    imagens: Imagem[]
    
    constructor(nome: string, descricao: string, categoria: CategoriaProdutoEnum, preco: number, tempoDePreparo: number, imagens: Imagem[], id?: number){
        super()
        
        this.id = id
        this.nome = nome
        this.descricao = descricao
        this.categoria = categoria
        this.preco = preco
        this.tempoDePreparo = tempoDePreparo
        this.imagens = imagens
        
        this.ValidaEntidade()
    }

    ValidaEntidade(): void {
        Produto.AtributoNumericoNaoPodeSerNegativo(this.preco, "Preço do produto nao pode ser negativo")
        Produto.AtributoNumericoNaoPodeSerNegativo(this.tempoDePreparo, "Tempo de preparo do produto nao pode ser negativo")
    }
}