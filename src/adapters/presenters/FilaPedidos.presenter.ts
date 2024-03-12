import { FilaPedidos } from "../../core/domain/entities/FilaPedidos"
import { Produto } from "../../core/domain/entities/Produto";
import { PedidoDetalhadoDto } from "../../drivers/driver/api/dto/Pedido.dto";

export class FilaPedidosPresenter {
    static entitiesToDto(filaPedidosEntidade: FilaPedidos[]): PedidoDetalhadoDto[] {
        let filaPedidosDto: PedidoDetalhadoDto[] = []
        filaPedidosEntidade.forEach(itemFila => {
            filaPedidosDto.push(
                {
                    idPedido: itemFila.pedido.id!,
                    idCliente: itemFila.pedido.cliente.id!,
                    statusPedido: itemFila.pedido.status,
                    dataInclusao: itemFila.dataInclusao,
                    itens: FilaPedidosPresenter.desempacotaProdutos(itemFila.pedido.itens)
                }
            )
        });
        return filaPedidosDto
    }

    private static desempacotaProdutos(itens: Produto[]) {
        return itens.map(item => {
            return {
                nome: item.nome,
                descricao: item.descricao
            }
        })
    }
}
