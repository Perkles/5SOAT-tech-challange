import { DomainException } from "../../domain/base/Domain.exception";
import { FilaPedidosRepository } from "../ports/FilaPedidos.repository";
import { PedidoRepository } from "../ports/Pedido.repository";

export class FilaPedidosService {
    constructor(private readonly filaPedidosRepository: FilaPedidosRepository, 
        private readonly pedidoRepository: PedidoRepository) { }

    async adicionaPedidoAFilaDePedidos(id: number): Promise<boolean> {
        let pedidoExistente = await this.pedidoRepository.buscaPedidoPorId(id)
        if(!pedidoExistente){
            throw new DomainException(`Pedido com o identificador ${id} não existe`)
        }
        return this.filaPedidosRepository.adicionaPedido(pedidoExistente);
    }
}