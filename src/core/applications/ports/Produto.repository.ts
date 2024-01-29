import { Produto } from "../../domain/entities/Produto";
import { CategoriaProdutoEnum } from "../../domain/valueObjects/enum/CategoriaProduto.enum";

export interface ProdutoRepository {
    buscaProdutoPorId(id: number): Promise<Produto | undefined>
    buscaPorCategoria(categoria: CategoriaProdutoEnum): Promise<Produto[] | undefined>
    salvaProduto(produto: Produto): Promise<Produto>
    editaProduto(produto: Produto): Promise<Produto>
    deletaProduto(produto: Produto): Promise<boolean>
}