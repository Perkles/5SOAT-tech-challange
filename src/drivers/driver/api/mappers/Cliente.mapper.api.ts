import { Request } from 'express';
import { Cliente } from "../../../../core/domain/entities/Cliente";
import { Cpf } from "../../../../core/domain/valueObjects/Cpf.vo";
import { Email } from "../../../../core/domain/valueObjects/Email.vo";

export class ClienteMapperApi {
    
    static requestToEntity(request: Request): Cliente {
        return new Cliente(
            {
                cpf: new Cpf(request.body.cpf),
                nome: request.body.nome,
                email: new Email(request.body.email)
            }
        )
    }
}