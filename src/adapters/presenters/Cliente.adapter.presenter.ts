import { Cliente } from "../../core/domain/entities/Cliente";
import { ClienteDTO } from "../../drivers/driver/api/dto/Cliente.dto";

export class ClientePresenter {
    static entityToDTO(clienteEntity: Cliente): ClienteDTO {
        const entidade = JSON.parse(JSON.stringify(clienteEntity))
        return new ClienteDTO({
            nome: entidade.nome,
            cpf: entidade.cpf,
            email: entidade.email
        })
    }
}