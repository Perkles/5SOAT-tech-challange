import {Request} from 'express';
import { Produto } from "../../../../core/domain/entities/Produto";
import { ImagemMapperApi } from './Imagem.mapper.api';
import { CategoriaProduto } from '../../../../core/domain/valueObjects/CategoriaProduto.vo';

export class ProdutoMapperApi {
    
    static requestToEntity(request: Request): Produto {
        const categoriaProdutoEnum = new CategoriaProduto(request.body.categoria).retornaCategoriaProdutoEnum()
        return new Produto(
            request.body.nome,
            request.body.descricao,
            categoriaProdutoEnum,
            request.body.preco,
            request.body.tempoDePreparo,
            ImagemMapperApi.requestToEntity(request),
            request.body.id
        )
    }
}