import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import express, { Express } from "express";
import { ClienteApiController } from "./controllers/Cliente.api.controller";
import { ProdutoApiController } from "./controllers/Produto.api.controller";
import { PedidoApiController } from "./controllers/Pedido.api.controller";
import ClienteRepositoryPostgresDriver from '../../driven/postgres/repositories/Cliente.repository.driver';
import sequelize from '../../driven/postgres/config/Database.config';
import ProdutoRepositoryPostgresDriver from '../../driven/postgres/repositories/Produto.repository.driver';
import PedidoRepositoryPostgresDriver from '../../driven/postgres/repositories/Pedido.repository.driver';
import FilaPedidoRepositoryPostgresDriver from '../../driven/postgres/repositories/FilaPedido.repository.driver';
import { VendasApiController } from './controllers/Vendas.api.controller';
import { FilaPedidosApiController } from './controllers/FilaPedidos.api.controller';

const app: Express = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const prefix = "/api/v1"
const porta = process.env.API_PORT;

// Repositórios
const clienteRepositoryPostgresDriver = new ClienteRepositoryPostgresDriver()
const produtoRepositoryPostgresDriver = new ProdutoRepositoryPostgresDriver()
const pedidoRepositoryPostgresDriver = new PedidoRepositoryPostgresDriver()
const filaPedidoRepositoryPostgresDrive = new FilaPedidoRepositoryPostgresDriver()

// Api Controllers
const clienteApiController = new ClienteApiController(clienteRepositoryPostgresDriver);
const produtoApiController = new ProdutoApiController(produtoRepositoryPostgresDriver)
const pedidoApiController = new PedidoApiController(pedidoRepositoryPostgresDriver, produtoRepositoryPostgresDriver, clienteRepositoryPostgresDriver)
const vendasApiController = new VendasApiController(pedidoRepositoryPostgresDriver, filaPedidoRepositoryPostgresDrive)
const filaPedidosApiController = new FilaPedidosApiController(filaPedidoRepositoryPostgresDrive)



// Administrativo - Cadastro e disponibilidade dos produtos e Clientes

app.post(`${prefix}/administrativo/cliente/cadastro-cpf`, clienteApiController.cadastraClienteCpf.bind(clienteApiController));
app.post(`${prefix}/administrativo/cliente/cadastro-simples`, clienteApiController.cadastraClientePorNomeEmail.bind(clienteApiController));
app.get(`${prefix}/administrativo/cliente/busca-cpf/:cpf`, clienteApiController.buscaPorCpf.bind(clienteApiController));
app.post(`${prefix}/administrativo/produto/novo`, produtoApiController.novoProduto.bind(produtoApiController));
app.get(`${prefix}/administrativo/produto/busca/:categoria`, produtoApiController.buscaProdutosPorCategoria.bind(produtoApiController));
app.put(`${prefix}/administrativo/produto/edita`, produtoApiController.editaProduto.bind(produtoApiController));
app.delete(`${prefix}/administrativo/produto/deleta/:id`, produtoApiController.deletaProduto.bind(produtoApiController));

// Expedição - Preparo e execução do pedido e sua retirada

// 
app.get(`${prefix}/expedicao/acompanhamento-pedido/pedidos`, filaPedidosApiController.listaPedidosParaAcompanhamento.bind(filaPedidosApiController));
app.post(`${prefix}/expedicao/controle-producao/novo`, pedidoApiController.novoPedido.bind(pedidoApiController));
// /expedicao/controle-producao/preparacao
// /expedicao/controle-producao/pronto
// /expedicao/controle-producao/finalizado


// Vendas - Interação do Cliente com a interface de Vendas e pagamento

// /vendas/pagamento -
// /vendas/pagamento/status
app.post(`${prefix}/vendas/pagamento/callback_hook`, vendasApiController.callbackHook.bind(vendasApiController));



sequelize.sync();
app.listen(porta, () => {console.log(`[server]: Server is running at http://localhost:${porta}`);});