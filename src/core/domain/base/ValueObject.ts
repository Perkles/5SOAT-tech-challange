export class ValueObject {

    static igual(direita: ValueObject, esquerda: ValueObject): boolean {
        return direita === esquerda;
    }
}