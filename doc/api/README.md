# API

Esse documento descreve em detalhes como a API está organizada e ilustra como a mesma atende os requisitos dos entregáveis solicitados na fase 2 do Tech Challenge. Para instalação e funcionamento da api acesse a [infraestrutura](../infraestrutura/README.md)

## > Collection

Você encontra a Collection com todos os endpoints funcionais citados [aqui](../assets/files/mequidonalds.postman_collection.json) em formato de JSON. A Collection pode ser importada em ferramentas como Insomnia ou Postman.

## > Organização

Os endpoints da api estão organizados em 3 categorias:

- Administrativo: Gerencia o cadastro e disponibilidade dos produtos e Clientes
- Expedição: Trata do preparo e execução do Pedido e sua Retirada
- Vendas:Trata da interação do Cliente com a Interface de Vendas e seu Pagamento

Esses agrupamentos sirgiram a partir da delimitação dos contextos existentes na aplicação.

## > Preparação

Para que os exemplos que elucidam os entregáveis sejam possíveis é preciso criar alguns objetos primeiro

### Criando um cliente

O cadastro de clientes pode ser realizado de 2 maneiras de acordo com a especificação do desafío:

- Identificando-se somente com o CPF
- Identificando-se com Nome e Email

Para esse exemplo usaremos o cadastro de Nome e Email, para isso chamamos o endpoint: 

`POST` `api/v1/administrativo/cliente/cadastro-simples`

Passando os dados do cliente como:

````JSON
{
    "nome": "joao",
    "email": "joao@joao.com"
}
````

E devemos receber a seguinte mensagem de `Sucesso`:

````JSON
{
    "message": "Cliente criado com sucesso",
    "cliente": {
        "nome": "joao",
        "cpf": null,
        "email": "joao@joao.com"
    }
}
````

### Cadastrando um Produto

Para realizar um pedido também é necessário o cadastro de um produto. Podemos faze-lo chamando o endpoint:

`POST` `/api/v1/administrativo/produto/novo`

Passando os dados fictícios:

````JSON
{
    "nome": "Hamburguer",
    "descricao": "Bife + Salada + Pão",
    "categoria": "lanche",
    "preco": 20,
    "tempoDePreparo": 15,
    "imagens": [
        {
            "nome": "hamburguer.png",
            "descricao": "Um hamburguer overpriced de gosto duvidoso",
            "url": "http://mcdonalds.com/hamburguer/genuino"
        }
    ]
}
````

Espera-se uma mensagem de sucesso com o mesmo payload de entrada.

## > Entregáveis

Com produto e cliente cadastrados podemos seguir para os entregáveis.

### 1 - Checkout Pedido que deverá receber os produtos solicitados e retornar a identificação do pedido

Para tal faz se uma chamada para:

`POST` `/api/v1/expedicao/controle-producao/novo`

Passando:

````JSON
{
  "clienteId": 1,
  "itens": [1]
}
````

Obtendo a identificação do pedido: 

````JSON
{
    "message": "Pedido Cadastrado",
    "pedido": {
        "idPedido": 5,
        "idCliente": 1,
        "statusPedido": "pagamentoPendente"
    }
}
````

### 2 - Consultar satatus pagamento pedido, que informa se o pagamento foi aprovado ou não

Para tal faz se uma chamada para 

`POST` `/api/v1/vendas/pagamento/status/1`

Passando:

````JSON
{
  "clienteId": 1,
  "itens": [1]
}
````

Obtendo a identificação do pedido: 

````JSON
{
    "statusPagamento": "pagamentoPendente"
}
````

### 3 - Webhook para receber confirmação de pagamento aprovado ou recusado

Simula uma chamada a um endpoint que irá agir como Webhook de um possível Gateway de pagamentos.
Esse endpoint recebe dados fictícios, chama-se:

`POST` `/api/v1/vendas/pagamento/callback_hook`

Com o seguinte payload:

````JSON
{
  "idPedido": 1,
  "status": "aprovado"
}
````

Essa ação irá colocar o pedido na fila de execução de pedidos e mudará seu status para `RECEBIDO` conforme especificado na problemática do desafio.

### 4 - A lista de pedidos deverá retorna-los com descrição e seguindo uma ordenação específica

Somente pedidos com status: `PRONTO`, `EMPREPARACAO` e `RECEBIDO` devem compor a fila. Os pedidos também devem vir ordenados por data. 

Para isso chamamos: 

`GET` `/api/v1/expedicao/acompanhamento-pedido/pedidos`

Com a resposta:

````JSON
{
    "listaDePedidos": [
        {
            "idPedido": 1,
            "idCliente": 1,
            "statusPedido": "recebido",
            "dataInclusao": "2024-03-13T02:30:46.360Z",
            "itens": [
                {
                    "nome": "Hamburguer",
                    "descricao": "Bife + Salada + Pão"
                }
            ]
        }
    ]
}
````

### 5 - Atualizar o status do pedido

Uma vez que o pedido ja esta na fila de execução, podemos atualizar seu andamento chamando: 

`POST` `api/v1/expedicao/controle-producao/atualiza-andamento-pedido`

Passando:

````JSON
{
  "idPedido": 1,
  "status": "emPreparacao"
}
````

Com a seguinte resposta de sucesso:

````JSON
{
  "message": "Status atualizado"
}
````

O item 6, desafio extra, não foi realizado.
