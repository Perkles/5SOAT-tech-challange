export interface NovoPedido {
    clienteId: number,
    itens: PedidoId[]
}

interface PedidoId {
    pedidoId: number
}