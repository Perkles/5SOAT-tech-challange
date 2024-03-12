import { FilaPedidosRepository } from "../../core/domain/base/ports/FilaPedidos.repository";
import { FilaPedidosUsecase } from "../../core/domain/useCases/FilaPedidos.usecase";
import { PedidoDetalhadoDto } from "../../drivers/driver/api/dto/Pedido.dto";
import { FilaPedidosAdapterGateway } from "../gateways/FilaPedidos.adapter.gateway";
import { FilaPedidosPresenter } from "../presenters/FilaPedidos.adapter.presenter";

export class FilaPedidosAdapterController {

    static async listaPedidosParaAcompanhamento(filaPedidoRepository: FilaPedidosRepository): Promise<PedidoDetalhadoDto[] | undefined>{
        const listaDePedidos = await FilaPedidosUsecase.listaPedidosParaAcompanhamento(new FilaPedidosAdapterGateway(filaPedidoRepository))
        return new Promise((resolve) => {
            resolve(listaDePedidos ? FilaPedidosPresenter.entitiesToDto(listaDePedidos) : undefined)
        });
    }
}