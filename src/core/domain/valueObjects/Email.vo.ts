import { DomainException } from "../base/Domain.exception";
import { ValueObject } from "../base/ValueObject";

export class Email extends ValueObject {
    valor: string;

    constructor(email: string) {
        super();

        if (!this.validaEmail(email)) {
            throw new DomainException('Endereço de e-mail inválido.');
        }
        
        this.valor = email;
    }

    private validaEmail(email: string): boolean {
        if(email)
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        else
            return true
    }
}