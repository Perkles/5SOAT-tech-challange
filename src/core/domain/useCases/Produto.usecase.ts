import { UseCaseException } from "../../../adapters/exceptions/Usecase.exception";
import { ProdutoAdapterGateway } from "../../../adapters/gateways/Produto.adapter.gateway";
import { ProdutoDto } from "../../../drivers/driver/api/dto/Produto.dto";
import { Produto } from "../entities/Produto";
import { ProdutoFactory } from "../factories/Produto.factory";
import { CategoriaProduto } from "../valueObjects/CategoriaProduto.vo";

export class ProdutoUseCase {

    static async criaNovoProduto(produtoDto: ProdutoDto, produtoGateway: ProdutoAdapterGateway): Promise<Produto> {        
        const novoProduto = ProdutoFactory.montaProdutoApartirDoDto(produtoDto)
        return await produtoGateway.salvaProduto(novoProduto)
    }

    static async buscaPorCategoria(categoria: string, produtoGateway: ProdutoAdapterGateway): Promise<Produto[] | undefined>  {
        const categoriaProduto = new CategoriaProduto(categoria)
        return await produtoGateway.buscaPorCategoria(categoriaProduto.retornaCategoriaProdutoEnum())
    }

    static async editaProduto(idProduto: number, produtoDto: ProdutoDto, produtoGateway: ProdutoAdapterGateway) {
        const produtoExistente = await ProdutoUseCase.buscaProdutoPorId(idProduto, produtoGateway)
        if(!produtoExistente){
            throw new UseCaseException(`Produto inexistente na base de dados`)
        }
        const produto = ProdutoFactory.montaProdutoApartirDoDto(produtoDto, idProduto)
        return await produtoGateway.editaProduto(produto)
    }

    static async buscaProdutoPorId(idProduto: number, produtoGateway: ProdutoAdapterGateway): Promise<Produto | undefined> {
        return await produtoGateway.buscaProdutoPorId(idProduto)
    }

    static async deletaProduto(idProduto: number, produtoGateway: ProdutoAdapterGateway): Promise<boolean>{
        const produtoExistente = await ProdutoUseCase.buscaProdutoPorId(idProduto, produtoGateway)
        if(!produtoExistente){
            throw new UseCaseException(`Produto inexistente na base de dados`)
        }
        return await produtoGateway.deletaProduto(idProduto)
    }
}