import { FilaPedidosAdapterGateway } from "../../../adapters/gateways/FilaPedidos.gateway";
import { FilaPedidos } from "../entities/FilaPedidos";
import { StatusPedidoEnum } from "../valueObjects/enum/StatusPedido.enum";

export class FilaPedidosUsecase {
    static async listaPedidosParaAcompanhamento(filaPedidosGateway: FilaPedidosAdapterGateway): Promise<FilaPedidos[] | undefined> {
        const todosOsPedidosExistentesDaFilaDePedidos = await filaPedidosGateway.listaTodosPedidosDaFilaPedidos()
        if(todosOsPedidosExistentesDaFilaDePedidos && todosOsPedidosExistentesDaFilaDePedidos.length > 0){
            const filaFiltrada = todosOsPedidosExistentesDaFilaDePedidos
                .sort((itemFilaA: FilaPedidos, itemFilaB: FilaPedidos) => itemFilaA.dataInclusao.getTime() - itemFilaB.dataInclusao.getTime())
                .filter((itemFilaPedidos: FilaPedidos) => itemFilaPedidos.pedido.retornaStatus() !== StatusPedidoEnum.finalizado);
            return filaFiltrada
        }else{
            return undefined
        }
    }
}