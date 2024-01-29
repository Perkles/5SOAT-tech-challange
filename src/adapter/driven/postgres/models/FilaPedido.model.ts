import { DataTypes, Model } from "sequelize";
import sequelize from "../config/Database.config";
import { PedidoModel } from "./Pedido.model";

export class FilaPedidoModel extends Model {}

FilaPedidoModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,  
    primaryKey: true
  }
}, { tableName: "filaPedidos", sequelize });

FilaPedidoModel.belongsToMany(PedidoModel, { through: 'PedidosDaFila' });
PedidoModel.belongsToMany(FilaPedidoModel, { through: 'PedidosDaFila' });