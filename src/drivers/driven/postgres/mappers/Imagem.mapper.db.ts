import { Model } from "sequelize";
import { Entidade } from "../../../../core/domain/base/Entidade.interface";
import { Imagem } from "../../../../core/domain/entities/Imagem";
import { ImagemModel } from "../models/Imagem.model";

export class ImagemMapperDb { 

    static modelsToEntities(models: ImagemModel[]): Entidade[] {
        let imagensModel: Imagem[] = []
        models.forEach(model => {
            const imagemModel = model.get()
            imagensModel.push(
                new Imagem(
                    imagemModel.nome,
                    imagemModel.descricao,
                    imagemModel.url
                )
            )
        });
        return imagensModel
    }

    static entitiesToModels(imagens: Imagem[]): Model[] {
        let imagensModel: ImagemModel[] = []
        imagens.forEach(imagem => {
            imagensModel.push(
                ImagemModel.build({
                    nome: imagem.nome,
                    descricao: imagem.descricao,
                    url: imagem.url
                })
            )
        });
        return imagensModel
    }
}