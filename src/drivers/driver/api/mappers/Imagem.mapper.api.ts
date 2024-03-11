import {Request} from 'express';
import { ImagemDto } from '../dto/Imagem.dto';

export class ImagemMapperApi {

    static requestToDtos(request: Request): ImagemDto[]{
        let imagens: ImagemDto[] = []
        if(request.body.imagens && Array.isArray(request.body.imagens)){
            request.body.imagens.forEach((imagem: any) => {
                imagens.push(
                    new ImagemDto(
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