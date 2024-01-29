import { DomainException } from "../base/Domain.exception";
import { ValueObject } from "../base/ValueObject";
import { CategoriaProdutoEnum } from "./enum/CategoriaProduto.enum";

export class CategoriaProduto extends ValueObject {
    valor: string
    private categoriaProduto?: CategoriaProdutoEnum

    constructor(valor: string){
        super()

        this.valor = valor

        this.validaCategoria(this.valor)
    }

    validaCategoria(categoria: string) {
        const categoriaEnum: CategoriaProdutoEnum = CategoriaProdutoEnum[categoria as keyof typeof CategoriaProdutoEnum]
        if (!categoriaEnum) {
            throw new DomainException('Categoria inválida');
        }
        this.categoriaProduto = categoriaEnum
    }

    retornaCategoriaProdutoEnum(): CategoriaProdutoEnum {
        return this.categoriaProduto!
    }
}