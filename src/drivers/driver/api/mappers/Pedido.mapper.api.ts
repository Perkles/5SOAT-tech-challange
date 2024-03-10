import { Request } from 'express';
import { Pedido } from "../../../../core/domain/entities/Pedido";
import { ProdutoMapperApi } from "./Produto.mapper.api";
import { Cliente } from '../../../../core/domain/entities/Cliente';

export class PedidoMapperApi {
    
    static requestToEntity(request: Request): Pedido {
        return new Pedido(
            [ProdutoMapperApi.requestToEntity(request)],
            new Cliente({})
        )
    }
}