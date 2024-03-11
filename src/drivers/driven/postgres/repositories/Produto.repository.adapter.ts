import { ProdutoRepository } from "../../../../core/applications/ports/Produto.repository";
import { Produto } from "../../../../core/domain/entities/Produto";
import { CategoriaProdutoEnum } from "../../../../core/domain/valueObjects/enum/CategoriaProduto.enum";
import { ProdutoMapperDb } from "../mappers/Produto.mapper.db";
import { ImagemModel } from "../models/Imagem.model";
import { ProdutoModel } from "../models/Produto.model";

export default class ProdutoRepositoryPostgresDriver implements ProdutoRepository {

    async buscaProdutoPorId(id: number): Promise<Produto | undefined> {
        const produtoModel = await ProdutoModel.findByPk(id)
        return new Promise((resolve) => {
            resolve(produtoModel ? ProdutoMapperDb.modelToEntity(produtoModel) as Produto : undefined)
        });
    }

    async buscaPorCategoria(categoria: CategoriaProdutoEnum): Promise<Produto[]> {
        const produtos = await ProdutoModel.findAll({
            where: {
                categoria: categoria
            },
            include: {
                model: ImagemModel
            }
        });
        return new Promise((resolve) => {
            resolve(ProdutoMapperDb.modelsToEntities(produtos) as Produto[])
        });
    }

    async salvaProduto(produto: Produto): Promise<Produto> {
        let novoProduto = await ProdutoModel.create(
            {
                nome: produto.nome,
                descricao: produto.descricao,
                categoria: produto.categoria,
                preco: produto.preco,
                tempoDePreparo: produto.tempoDePreparo,
                ImagemModels: produto.imagens 
            }, {
                include: [ImagemModel]
            }
        )
        return new Promise((resolve) => {
            resolve(ProdutoMapperDb.modelToEntity(novoProduto) as Produto)
        });
    }
    
    async editaProduto(produto: Produto): Promise<Produto> {
        const produtoModel = ProdutoMapperDb.entityToModel(produto) as ProdutoModel
        await ProdutoModel.update(
            {
                nome: produtoModel.get().nome,
                descricao: produtoModel.get().descricao,
                categoria: produtoModel.get().categoria,
                preco: produtoModel.get().preco,
                tempoDePreparo: produtoModel.get().tempoDePreparo,
            },
            {
                where: {
                    id: produtoModel.get().id
                }
            }
        );
        return new Promise((resolve) => {
            resolve(ProdutoMapperDb.modelToEntity(produtoModel) as Produto)
        });
    }
    
    async deletaProduto(idProduto: number): Promise<boolean> {
        await ProdutoModel.destroy({
            where: {
                id: idProduto
            }
        })
        return new Promise((resolve) => {
            resolve(true)
        });
    }
}