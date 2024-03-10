import { Request, Response } from 'express';
import { DomainException } from '../../../../core/domain/base/Domain.exception';
import { ClienteAdapterController } from '../../../../adapters/controllers/Cliente.controller';
import { ClienteRepository } from '../../../../core/applications/ports/Cliente.repository';
import { ClienteMapperApi } from '../mappers/Cliente.mapper.api';
import { UseCaseException } from '../../../../adapters/exceptions/UseCase.exception';

export class ClienteApiController {
    constructor(private readonly clienteRepositoy: ClienteRepository) { }

    async cadastraClienteCpf(request: Request, response: Response) {
        try{
            const novoCliente = await ClienteAdapterController.CadastraPorCpf(request.body.cpf, this.clienteRepositoy)
            response.status(200).json({message: "Cliente criado com sucesso", cliente: novoCliente})
        }catch(error){
            if(error instanceof DomainException || error instanceof UseCaseException){
                response.status(400).json({ message: error.message })
            }else {
                response.status(400).json({ message: "Falha ao cadastrar cliente" })
            }
        }
    }

    async cadastraClientePorNomeEmail(request: Request, response: Response) {
        try{
            const novoCliente = await ClienteAdapterController.CadastraPorNomeEmail(ClienteMapperApi.requestToClienteNomeEmailDTO(request), this.clienteRepositoy)
            response.status(200).json({message: "Cliente criado com sucesso", cliente: novoCliente})
        }catch(error){
            if(error instanceof DomainException){
                response.status(400).json({ message: error.message })
            }else {
                response.status(400).json({ message: "Falha ao cadastrar cliente" })
            }
        }
    }

    async buscaPorCpf(request: Request, response: Response) {
        try{
            const clienteEncontrado = await ClienteAdapterController.BuscaClienteCpf(request.params.cpf, this.clienteRepositoy)
            response.status(200).json({cliente: clienteEncontrado})
        }catch(error){
            if(error instanceof DomainException){
                response.status(400).json({ message: error.message })
            }else {
                response.status(400).json({ message: "Falha ao buscar cliente" })
            }
        }
    }
}