import { Imagem } from "../../core/domain/entities/Imagem"
import { Produto } from "../../core/domain/entities/Produto"
import { ImagemDto } from "../../drivers/driver/api/dto/Imagem.dto"
import { ProdutoDto } from "../../drivers/driver/api/dto/Produto.dto"


export class ProdutoPresenter {
    static entityToDTO(produtoEntity: Produto): ProdutoDto {
        const entidade = JSON.parse(JSON.stringify(produtoEntity))
        return new ProdutoDto(
            entidade.nome, 
            entidade.descricao,
            entidade.categoria,
            entidade.preco,
            entidade.tempoDePreparo,
            ProdutoPresenter.ImageEntityToDTO(entidade.imagens)
        )
    }

    private static ImageEntityToDTO(imagens: Imagem[]){
        let retornoImagens: ImagemDto[] = []
        if(imagens && Array.isArray(imagens)){
            imagens.forEach((imagem: any) => {
                retornoImagens.push(
                    new ImagemDto(
                        imagem.nome,
                        imagem.descricao,
                        imagem.url
                    )
                )
            });
        }
        return retornoImagens
    }

    static entitiesToDtos(produtoEntities: Produto[]): ProdutoDto[] {
        let retornoProdutos: ProdutoDto[] = []
        if(produtoEntities && Array.isArray(produtoEntities)){
            produtoEntities.forEach((produto: any) => {
                retornoProdutos.push(
                    new ProdutoDto(
                        produto.nome, 
                        produto.descricao,
                        produto.categoria,
                        produto.preco,
                        produto.tempoDePreparo,
                        ProdutoPresenter.ImageEntityToDTO(produto.imagens)
                    )
                )
            });
        }
        return retornoProdutos
    }
}