export interface PedidoDto {
    clienteId: number,
    itens: number[]
}

export interface NovoPedidoDto { 
    idPedido: number,
    idCliente: number,
    statusPedido: string
}