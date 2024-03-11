export class ImagemDto {
    nome: string
    descricao: string
    url: string

    constructor(nome: string, descricao: string, url: string, id?: number) {
        this.nome = nome, 
        this.descricao = descricao,
        this.url = url
    }
}