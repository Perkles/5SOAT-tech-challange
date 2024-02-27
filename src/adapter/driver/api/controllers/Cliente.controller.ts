import { Request, Response } from 'express';
import { ClienteService } from '../../../../core/applications/services/Cliente.service';
import { ClienteMapperApi } from '../mappers/Cliente.mapper.api';
import { DomainException } from '../../../../core/domain/base/Domain.exception';
import { Cpf } from '../../../../core/domain/valueObjects/Cpf.vo';

export class ClienteController {
    constructor(private readonly clienteService: ClienteService) { }

    async cadastraClienteNomeEmail(request: Request, response: Response) {
        try{
            const novoCliente = await this.clienteService.cadastroNomeEmail(ClienteMapperApi.requestToEntity(request))
            response.status(200).json({message: "Cliente criado com sucesso", cliente: novoCliente})
        }catch(error){
            if(error instanceof DomainException){
                response.status(400).json({ message: error.message })
            }else {
                response.status(400).json({ message: "Falha ao cadastrar cliente" })
            }
        }
    }

    async cadastraClienteCpf(request: Request, response: Response) {
        try{
            const novoCliente = await this.clienteService.cadastroViaCpf(ClienteMapperApi.requestToEntity(request))
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
            const clienteEncontrado = await this.clienteService.buscaClienteCpf(new Cpf(request.params.cpf))
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