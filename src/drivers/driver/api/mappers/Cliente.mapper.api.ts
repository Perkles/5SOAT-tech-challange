import { Request } from 'express';
import { ClienteDTO, ClienteNomeEmailDTO } from '../dto/Cliente.dto';

export class ClienteMapperApi {
    
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