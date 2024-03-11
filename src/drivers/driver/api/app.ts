import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import express, { Express } from "express";
import { ClienteService } from "../../../core/applications/services/Cliente.service";
import { ClienteApiController } from "./controllers/Cliente.controller";
import { ProdutoService } from "../../../core/applications/services/Produto.service";
import { ProdutoApiController } from "./controllers/Produto.controller";
import { PedidoService } from "../../../core/applications/services/Pedido.service";
import { PedidoController } from "./controllers/Pedido.controller";
import { FilaPedidosService } from "../../../core/applications/services/FilaPedido.service";
import { FilaPedidosController } from "./controllers/FilaPedidos.controller";
import ClienteRepositoryPostgresDriver from '../../driven/postgres/repositories/Cliente.repository.driver';
import sequelize from '../../driven/postgres/config/Database.config';
import ProdutoRepositoryPostgresDriver from '../../driven/postgres/repositories/Produto.repository.adapter';
import PedidoRepositoryAdapter from '../../driven/postgres/repositories/Pedido.repository.adapter';
import FilaPedidoRepositoryAdapter from '../../driven/postgres/repositories/FilaPedido.repository.adapter';

const app: Express = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const prefix = "/api/v1"
const porta = process.env.API_PORT;

const clienteRepositoryPostgresDriver = new ClienteRepositoryPostgresDriver()
const clienteController = new ClienteApiController(clienteRepositoryPostgresDriver);
// const clienteService = new ClienteService(clienteRepositoryPostgresDriver)

const produtoRepositoryPostgresDriver = new ProdutoRepositoryPostgresDriver()
const produtoController = new ProdutoApiController(produtoRepositoryPostgresDriver)
// const produtoService = new ProdutoService(produtoRepositoryPostgresDriver)

const pedidoRepository = new PedidoRepositoryAdapter()
const pedidoService = new PedidoService(pedidoRepository, clienteRepositoryPostgresDriver, produtoRepositoryPostgresDriver)
const pedidoController = new PedidoController(pedidoService)

const filaPedidosRepository = new FilaPedidoRepositoryAdapter()
const filaPedidosService = new FilaPedidosService(filaPedidosRepository, pedidoRepository)
const filaPedidosController = new FilaPedidosController(filaPedidosService)

// Clientes

app.post(`${prefix}/cliente/cadastro-cpf`, clienteController.cadastraClienteCpf.bind(clienteController));
app.post(`${prefix}/cliente/cadastro-simples`, clienteController.cadastraClientePorNomeEmail.bind(clienteController));
app.get(`${prefix}/cliente/busca-cpf/:cpf`, clienteController.buscaPorCpf.bind(clienteController));

// Produtos
app.post(`${prefix}/produto/novo`, produtoController.novoProduto.bind(produtoController));
app.get(`${prefix}/produto/busca/:categoria`, produtoController.buscaProdutosPorCategoria.bind(produtoController));
app.put(`${prefix}/produto/edita`, produtoController.editaProduto.bind(produtoController));
app.delete(`${prefix}/produto/deleta/:id`, produtoController.deletaProduto.bind(produtoController));

// Pedidos
app.get(`${prefix}/pedidos`, pedidoController.listaPedidos.bind(pedidoController));
app.post(`${prefix}/pedido/novo`, pedidoController.novoPedido.bind(pedidoController));

// Fila de Pedidos
app.post(`${prefix}/checkout/adiciona`, filaPedidosController.adicionaPedidoAFilaDePedidos.bind(filaPedidosController));


sequelize.sync();
app.listen(porta, () => {console.log(`[server]: Server is running at http://localhost:${porta}`);});