import { ProdutoRepository } from "../../core/applications/ports/Produto.repository";
import { ProdutoUseCase } from "../../core/domain/useCases/Produto.usecase";
import { ProdutoDto } from "../../drivers/driver/api/dto/Produto.dto";
import { ProdutoAdapterGateway } from "../gateways/Produto.gateway";
import { ProdutoPresenter } from "../presenters/Produto.presenter";

export class ProdutoAdapterController {

    static async criaNovoProduto(produtoDto: ProdutoDto, produtoRepository: ProdutoRepository) {
        const produtoGateway = new ProdutoAdapterGateway(produtoRepository)
        const produto = await ProdutoUseCase.criaNovoProduto(produtoDto, produtoGateway)
        return new Promise((resolve) => {
            resolve(produto ? ProdutoPresenter.entityToDTO(produto) as ProdutoDto : undefined)
        });
    }

    static async buscaPorCategoria(categoria: string, produtoRepository: ProdutoRepository) {
        const produtoGateway = new ProdutoAdapterGateway(produtoRepository)
        const produtos = await ProdutoUseCase.buscaPorCategoria(categoria, produtoGateway)
        return new Promise((resolve) => {
            resolve(produtos ? ProdutoPresenter.entitiesToDtos(produtos) as ProdutoDto[] : undefined)
        });
    }

    static async editaProduto(idProduto: number, produtoDto: ProdutoDto, produtoRepository: ProdutoRepository) {
        const produtoGateway = new ProdutoAdapterGateway(produtoRepository)
        const produto = await ProdutoUseCase.editaProduto(idProduto, produtoDto, produtoGateway)
        return new Promise((resolve) => {
            resolve(produto ? ProdutoPresenter.entityToDTO(produto) as ProdutoDto : undefined)
        });
    }
    
    static async deletaProduto(idProduto: number, produtoRepository: ProdutoRepository) {
        const produtoGateway = new ProdutoAdapterGateway(produtoRepository)
        return await ProdutoUseCase.deletaProduto(idProduto, produtoGateway)
    }
}