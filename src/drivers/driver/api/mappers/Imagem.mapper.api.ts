import {Request} from 'express';
import { Imagem } from '../../../../core/domain/entities/Imagem';

export class ImagemMapperApi {

    static requestToEntity(request: Request): Imagem[]{
        let imagens: Imagem[] = []
        if(request.body.imagens && Array.isArray(request.body.imagens )){
            request.body.imagens.forEach((imagem: any) => {
                imagens.push(
                    new Imagem(
                        imagem.nome,
                        imagem.descricao,
                        imagem.url
                    )
                )
            });
        }
        return imagens
    }
}