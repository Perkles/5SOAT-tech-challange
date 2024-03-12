export interface PedidoEntradaDto {
    clienteId: number,
    itens: number[]
}

export interface NovoPedidoDto { 
    idPedido: number,
    idCliente: number,
    statusPedido: string
}

export interface PedidoCallbackDto {
    idPedido: number,
    statusPedido: string
}

export interface PedidoDetalhadoDto {
    idPedido: number,
    idCliente: number,
    statusPedido: string,
    dataInclusao: Date
    itens: ProdutoDescricaoSimplesDto[]
}

export interface ProdutoDescricaoSimplesDto { 
    nome: string,
    descricao: string
}

export interface AtualizacaoStatusPedidoDto {
    idPedido: number,
    statusPedido: string
}