import { Model } from "sequelize";
import { Entidade } from "../../../../core/domain/base/Entidade.interface";
import { Imagem } from "../../../../core/domain/entities/Imagem";
import { Produto } from "../../../../core/domain/entities/Produto";
import { ProdutoModel } from "../models/Produto.model";
import { ImagemMapperDb } from "./Imagem.mapper.db";


export class ProdutoMapperDb {

    static modelToEntity(model: ProdutoModel): Entidade {
        const produtoModel = model.get();
        return new Produto(
            produtoModel.nome,
            produtoModel.descricao,
            produtoModel.categoria,
            produtoModel.preco,
            produtoModel.tempoDePreparo,
            produtoModel.ImagemModels ? ImagemMapperDb.modelsToEntities(produtoModel.ImagemModels) as Imagem[] : {} as Imagem[],
            produtoModel.id
        )
    }

    static modelsToEntities(models: ProdutoModel[]): Entidade[] {
        let produtosEntidade: Produto[] = [];
        models.forEach(model => {
            const produtoModel = model.get();
            produtosEntidade.push(
                new Produto(
                    produtoModel.nome,
                    produtoModel.descricao,
                    produtoModel.categoria,
                    produtoModel.preco,
                    produtoModel.tempoDePreparo,
                    produtoModel.ImagemModels ? ImagemMapperDb.modelsToEntities(produtoModel.ImagemModels) as Imagem[] : [])
            );
        });
        return produtosEntidade;
    }

    static entityToModel(produto: Produto): Model {
        return ProdutoModel.build(
            {
                nome: produto.nome,
                descricao: produto.descricao,
                categoria: produto.categoria,
                preco: produto.preco,
                tempoDePreparo: produto.tempoDePreparo,
                ImagemModel: produto.imagens,
                id: produto.id
            }
        )
    }

    static entitiesToModels(produtos: Produto[]): Model[] {
        let produtosModel: ProdutoModel[] = []
        produtos.forEach(produto => {
            produtosModel.push(ProdutoModel.build(
                {
                    nome: produto.nome,
                    descricao: produto.descricao,
                    categoria: produto.categoria,
                    preco: produto.preco,
                    tempoDePreparo: produto.tempoDePreparo,
                    ImagemModel: produto.imagens,
                    id: produto.id
                }))
        });
        return produtosModel
    }
}
