import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import express, { Express } from "express";
import { ClienteApiController } from "./controllers/Cliente.controller";
import { ProdutoApiController } from "./controllers/Produto.controller";
import { PedidoController } from "./controllers/Pedido.controller";
import { FilaPedidosService } from "../../../core/applications/services/FilaPedido.service";
import { FilaPedidosController } from "./controllers/FilaPedidos.controller";
import ClienteRepositoryPostgresDriver from '../../driven/postgres/repositories/Cliente.repository.driver';
import sequelize from '../../driven/postgres/config/Database.config';
import ProdutoRepositoryPostgresDriver from '../../driven/postgres/repositories/Produto.repository.driver';
import PedidoRepositoryPostgresDriver from '../../driven/postgres/repositories/Pedido.repository.driver';
import FilaPedidoRepositoryAdapter from '../../driven/postgres/repositories/FilaPedido.repository.adapter';

const app: Express = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const prefix = "/api/v1"
const porta = process.env.API_PORT;

const clienteRepositoryPostgresDriver = new ClienteRepositoryPostgresDriver()
const clienteController = new ClienteApiController(clienteRepositoryPostgresDriver);

const produtoRepositoryPostgresDriver = new ProdutoRepositoryPostgresDriver()
const produtoController = new ProdutoApiController(produtoRepositoryPostgresDriver)

const pedidoRepositoryPostgresDriver = new PedidoRepositoryPostgresDriver()
const pedidoController = new PedidoController(pedidoRepositoryPostgresDriver, produtoRepositoryPostgresDriver, clienteRepositoryPostgresDriver)

const filaPedidosRepository = new FilaPedidoRepositoryAdapter()
const filaPedidosService = new FilaPedidosService(filaPedidosRepository, pedidoRepositoryPostgresDriver)
const filaPedidosController = new FilaPedidosController(filaPedidosService)


// Administrativo - Cadastro e disponibilidade dos produtos e Clientes

app.post(`${prefix}/administrativo/cliente/cadastro-cpf`, clienteController.cadastraClienteCpf.bind(clienteController));
app.post(`${prefix}/administrativo/cliente/cadastro-simples`, clienteController.cadastraClientePorNomeEmail.bind(clienteController));
app.get(`${prefix}/administrativo/cliente/busca-cpf/:cpf`, clienteController.buscaPorCpf.bind(clienteController));
app.post(`${prefix}/administrativo/produto/novo`, produtoController.novoProduto.bind(produtoController));
app.get(`${prefix}/administrativo/produto/busca/:categoria`, produtoController.buscaProdutosPorCategoria.bind(produtoController));
app.put(`${prefix}/administrativo/produto/edita`, produtoController.editaProduto.bind(produtoController));
app.delete(`${prefix}/administrativo/produto/deleta/:id`, produtoController.deletaProduto.bind(produtoController));

// Expedição - Preparo e execução do pedido e sua retirada

// /expedicao/acompanhamento-pedido/pedidos
app.post(`${prefix}/expedicao/controle-producao/novo`, pedidoController.novoPedido.bind(pedidoController));
// /expedicao/controle-producao/preparacao
// /expedicao/controle-producao/pronto
// /expedicao/controle-producao/finalizado


// Vendas - Interação do Cliente com a interface de Vendas e pagamento

// /vendas/pagamento -
// /vendas/pagamento/status
// /vendas/pagamento/callback_hook


sequelize.sync();
app.listen(porta, () => {console.log(`[server]: Server is running at http://localhost:${porta}`);});