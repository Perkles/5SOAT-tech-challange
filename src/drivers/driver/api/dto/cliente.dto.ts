export class ClienteDTO {
    id?: number
    cpf?: string
    nome?: string
    email?: string 

    constructor(partial: Partial<ClienteDTO>) {
        Object.assign(this, partial);
    }
}

export interface ClienteNomeEmailDTO {
    nome: string
    email: string
}