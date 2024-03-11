import { ProdutoDto } from "../../../drivers/driver/api/dto/Produto.dto";
import { Imagem } from "../entities/Imagem";
import { Produto } from "../entities/Produto";
import { CategoriaProduto } from "../valueObjects/CategoriaProduto.vo";

export class ProdutoFactory {
    
    static montaProdutoApartirDoDto(produtoDto: ProdutoDto, id?: number): Produto{
        const categoriaProdutoEnum = new CategoriaProduto(produtoDto.categoria).retornaCategoriaProdutoEnum()

        let imagens: Imagem[] = []
        if(produtoDto.imagens && Array.isArray(produtoDto.imagens)){
            produtoDto.imagens.forEach((imagem: any) => {
                imagens.push(
                    new Imagem(
                        imagem.nome,
                        imagem.descricao,
                        imagem.url
                    )
                )
            });
        }

        return new Produto(
            produtoDto.nome,
            produtoDto.descricao,
            categoriaProdutoEnum,
            produtoDto.preco,
            produtoDto.tempoDePreparo,
            imagens,
            id
        )
    }
}