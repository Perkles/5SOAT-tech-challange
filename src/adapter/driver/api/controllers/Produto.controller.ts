import {Request, Response} from 'express';
import { ProdutoService } from "../../../../core/applications/services/Produto.service";
import { ProdutoMapperApi } from "../mappers/Produto.mapper.api";
import { DomainException } from '../../../../core/domain/base/Domain.exception';

export class ProdutoController {
    
    constructor(private readonly produtoService: ProdutoService) { }

    async buscaProdutoPorCategoria(request: Request, response: Response) {
        try{
            const produtosPorCategoria = await this.produtoService.buscaPorCategoria(request.params.categoria)
            response.status(200).json({produtos : produtosPorCategoria})
        }catch(error){
            if(error instanceof DomainException){
                response.status(400).json({ message: error.message })
            }else {
                response.status(400).json({ message: "Falha buscar produtos" })
            }
        }
    }

    async novoProduto(request: Request, response: Response) {
        try{
            const produto = await this.produtoService.cadastraProduto(ProdutoMapperApi.requestToEntity(request))
            response.status(200).json({message: "Produto cadastrado", produto: produto})
        }catch(error){
            if(error instanceof DomainException){
                response.status(400).json({ message: error.message })
            }else {
                response.status(400).json({ message: "Falha ao cadastrar produto" })
            }
        }
    }

    async editaProduto(request: Request, response: Response) {
        try{
            const produto = await this.produtoService.editaProduto(ProdutoMapperApi.requestToEntity(request))
            response.status(200).json({message: "Produto alterado com sucesso", produto: produto})
        }catch(error){
            if(error instanceof DomainException){
                response.status(400).json({ message: error.message })
            }else {
                response.status(400).json({ message: "Falha editar produto" })
            }
        }
    }

    async deletaProduto(request: Request, response: Response) {
        try{
            await this.produtoService.removeProduto(parseInt(request.params.id))
            response.status(200).json({message: "Deletado com sucesso"})
        }catch(error){
            if(error instanceof DomainException){
                response.status(400).json({ message: error.message })
            }else {
                response.status(400).json({ message: "Falha deletar produto" })
            }
        }
    }
}