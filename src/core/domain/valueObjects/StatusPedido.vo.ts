import { DomainException } from "../base/Domain.exception"
import { ValueObject } from "../base/ValueObject"
import { StatusPedidoEnum } from "./enum/StatusPedido.enum"

export class StatusPedido extends ValueObject {
    valor: string
    private statusPedido?: StatusPedidoEnum

    constructor(valor: string){
        super()

        this.valor = valor

        this.validaStatusPedido(this.valor)
    }

    validaStatusPedido(statusPedido: string) {
        const statusPedidoEnum: StatusPedidoEnum = StatusPedidoEnum[statusPedido as keyof typeof StatusPedidoEnum]
        if (!statusPedidoEnum) {
            throw new DomainException('Status inválido');
        }
        this.statusPedido = statusPedidoEnum
    }

    retornaStatusPedidoEnum(): StatusPedidoEnum {
        return this.statusPedido!
    }
}