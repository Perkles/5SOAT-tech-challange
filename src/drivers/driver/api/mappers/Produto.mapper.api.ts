import {Request} from 'express';
import { ImagemMapperApi } from './Imagem.mapper.api';
import { ProdutoDto } from '../dto/Produto.dto';

export class ProdutoMapperApi {

    static requestToDTO(request: Request): ProdutoDto {
        return new ProdutoDto(
            request.body.nome,
            request.body.descricao,
            request.body.categoria,
            request.body.preco,
            request.body.tempoDePreparo,
            ImagemMapperApi.requestToDtos(request)
        )
    }
}