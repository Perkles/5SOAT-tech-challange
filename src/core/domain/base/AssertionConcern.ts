import { DomainException } from "./Domain.exception";

export class AssertionConcern {

    static AtributoNaoPodeSerVazio(atributo: any, errorMessage: string){
        if(!atributo || atributo == ""){
            throw new DomainException(errorMessage);
        }
    }

    static AtributoNumericoNaoPodeSerNegativo(atributo: any, errorMessage: string){
        if(atributo < 0){
            throw new DomainException(errorMessage);
        }
    }

    static AtributoListaNaoPodeSerVazio(atributo: Array<any>, errorMessage: string){
        if(atributo.length == 0){
            throw new DomainException(errorMessage);
        }
    }
}