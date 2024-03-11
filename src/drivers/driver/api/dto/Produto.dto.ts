import { ImagemDto } from "./Imagem.dto"

export class ProdutoDto {
    nome: string
    descricao: string
    categoria: string
    preco: number
    tempoDePreparo: number
    imagens: ImagemDto[]

    constructor(nome: string, descricao: string, categoria: string, preco: number, tempoDePreparo: number, imagens: ImagemDto[]) {        
        this.nome = nome
        this.descricao = descricao
        this.categoria = categoria
        this.preco = preco
        this.tempoDePreparo = tempoDePreparo
        this.imagens = imagens
    }

}