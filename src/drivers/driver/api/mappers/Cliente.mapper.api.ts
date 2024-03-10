import { Request } from 'express';
import { Cliente } from "../../../../core/domain/entities/Cliente";
import { Cpf } from "../../../../core/domain/valueObjects/Cpf.vo";
import { Email } from "../../../../core/domain/valueObjects/Email.vo";
import { ClienteDTO, ClienteNomeEmailDTO } from '../dto/cliente.dto';

export class ClienteMapperApi {
    
    //deprecated
    static requestToEntity(request: Request): Cliente {
        return new Cliente(
            {
                cpf: new Cpf(request.body.cpf),
                nome: request.body.nome,
                email: new Email(request.body.email)
            }
        )
    }

    static requestToDTO(request: Request): ClienteDTO {
        return new ClienteDTO(
            {
                cpf: request.body.cpf,
                nome: request.body.nome,
                email: request.body.email
            }
        )
    }

    static requestToClienteNomeEmailDTO(request: Request):  ClienteNomeEmailDTO{
        return {
                nome: request.body.nome,
                email: request.body.email
        } as ClienteNomeEmailDTO
    }
}