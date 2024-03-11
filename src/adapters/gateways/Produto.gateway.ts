import { ProdutoRepository } from "../../core/applications/ports/Produto.repository";
import { Produto } from "../../core/domain/entities/Produto";
import { CategoriaProdutoEnum } from "../../core/domain/valueObjects/enum/CategoriaProduto.enum";
import { AdapterGateway, GatewayDatasources } from "./interface/Gateway.interface";

export class ProdutoAdapterGateway implements AdapterGateway {
    
    datasource: GatewayDatasources;

    constructor(datasource: GatewayDatasources) {
        this.datasource = datasource;
    }

    async buscaPorCategoria(categoria: CategoriaProdutoEnum): Promise<Produto[] | undefined> {
        return await (this.datasource as ProdutoRepository).buscaPorCategoria(categoria)
    }

    async salvaProduto(produto: Produto): Promise<Produto> {
        return await (this.datasource as ProdutoRepository).salvaProduto(produto)
    }
    
    async buscaProdutoPorId(idProduto: number): Promise<Produto | undefined> {
        return await (this.datasource as ProdutoRepository).buscaProdutoPorId(idProduto)
    }

    async editaProduto(produto: Produto) {
        return await (this.datasource as ProdutoRepository).editaProduto(produto)
    }

    async deletaProduto(idProduto: number): Promise<boolean> {
        return await (this.datasource as ProdutoRepository).deletaProduto(idProduto)
    }
}