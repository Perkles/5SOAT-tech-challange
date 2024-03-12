import {Request, Response} from 'express';
import { DomainException } from '../../../../core/domain/base/Domain.exception';
import { ProdutoRepository } from '../../../../core/applications/ports/Produto.repository';
import { ProdutoAdapterController } from '../../../../adapters/controllers/Produto.adapter.controller';
import { ProdutoMapperApi } from '../mappers/Produto.mapper.api';
import { UseCaseException } from '../../../../adapters/exceptions/UseCase.exception';

export class ProdutoApiController {
    
    constructor(private readonly produtoRepository: ProdutoRepository) { }

    async novoProduto(request: Request, response: Response) {
        try{
            const novoProduto = await ProdutoAdapterController.criaNovoProduto(ProdutoMapperApi.requestToDTO(request), this.produtoRepository)
            response.status(200).json({message: "Produto cadastrado", produto: novoProduto})
        }catch(error){
            if(error instanceof DomainException){
                response.status(400).json({ message: error.message })
            }else {
                response.status(400).json({ message: "Falha ao cadastrar produto" })
            }
        }
    }

    async buscaProdutosPorCategoria(request: Request, response: Response) {
        try{
            const produtosPorCategoria = await ProdutoAdapterController.buscaPorCategoria(request.params.categoria, this.produtoRepository)
            response.status(200).json({produtos : produtosPorCategoria})
        }catch(error){
            if(error instanceof DomainException){
                response.status(400).json({ message: error.message })
            }else {
                response.status(400).json({ message: "Falha buscar produtos" })
            }
        }
    }

    async editaProduto(request: Request, response: Response) {
        try{
            const produto = await ProdutoAdapterController.editaProduto(request.body.id, ProdutoMapperApi.requestToDTO(request), this.produtoRepository)
            response.status(200).json({message: "Produto alterado com sucesso", produto: produto})
        }catch(error){
            if(error instanceof DomainException || error instanceof UseCaseException){
                response.status(400).json({ message: error.message })
            }else {
                response.status(400).json({ message: "Falha editar produto" })
            }
        }
    }

    async deletaProduto(request: Request, response: Response) {
        try{
            await ProdutoAdapterController.deletaProduto(parseInt(request.params.id), this.produtoRepository)
            response.status(200).json({message: "Deletado com sucesso"})
        }catch(error){
            if(error instanceof DomainException || error instanceof UseCaseException){
                response.status(400).json({ message: error.message })
            }else {
                response.status(400).json({ message: "Falha deletar produto" })
            }
        }
    }
}