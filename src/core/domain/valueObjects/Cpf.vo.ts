import { DomainException } from "../base/Domain.exception";
import { ValueObject } from "../base/ValueObject";

export class Cpf extends ValueObject {
    valor: string;
 
    constructor(valor: string) {
        super();

        if (!this.validaCPF(valor)) {
            throw new DomainException('CPF inválido');
        }

        this.valor = valor;
    }

    private validaCPF(cpf: string): boolean {
        if(!cpf){
            return true
        }
        const cpfNumerico = cpf.replace(/\D/g, '');

        if (cpfNumerico.length !== 11) {
            return false;
        }

        if (/^(\d)\1+$/.test(cpfNumerico)) {
            return false;
        }

        const calcularDigito = (slice: string) => {
            let soma = 0;
            for (let i = 0; i < slice.length; i++) {
                soma += parseInt(slice[i]) * (slice.length + 1 - i);
            }
            const resto = soma % 11;
            return resto < 2 ? 0 : 11 - resto;
        };

        const digito1 = calcularDigito(cpfNumerico.slice(0, 9));
        const digito2 = calcularDigito(cpfNumerico.slice(0, 9) + digito1);

        return parseInt(cpfNumerico[9]) === digito1 && parseInt(cpfNumerico[10]) === digito2;
    }
}