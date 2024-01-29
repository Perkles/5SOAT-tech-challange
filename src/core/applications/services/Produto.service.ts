import { DomainException } from "../../domain/base/Domain.exception";
import { Produto } from "../../domain/entities/Produto";
import { CategoriaProduto } from "../../domain/valueObjects/CategoriaProduto.vo";
import { ProdutoRepository } from "../ports/Produto.repository";

export class ProdutoService {
    constructor(private readonly produtoRepository: ProdutoRepository) { }

    async cadastraProduto(produto: Produto): Promise<Produto> {
        return await this.produtoRepository.salvaProduto(produto);
    }

    async editaProduto(produto: Produto): Promise<Produto> {
        let produtoExistente = await this.produtoRepository.buscaProdutoPorId(produto.id!)
        if(!produtoExistente) {
           throw new DomainException(`Produto de identificador ${produto.id} não existe`)
        }
        return await this.produtoRepository.editaProduto(produto)
    }

    async removeProduto(id: number): Promise<boolean> {
        let produtoExistente = await this.produtoRepository.buscaProdutoPorId(id)
        if(!produtoExistente){
            throw new DomainException(`Produto com o identificador ${id} não existe`)
        }
        return await this.produtoRepository.deletaProduto(produtoExistente)    
    }

    async buscaPorCategoria(categoriaProduto: string): Promise<Produto[] | undefined> {
        const categoriaProdutoEnum = new CategoriaProduto(categoriaProduto).retornaCategoriaProdutoEnum()
        return await this.produtoRepository.buscaPorCategoria(categoriaProdutoEnum)
    }
}