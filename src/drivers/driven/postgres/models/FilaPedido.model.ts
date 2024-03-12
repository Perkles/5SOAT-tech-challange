import { DataTypes, Model } from "sequelize";
import sequelize from "../config/Database.config";
import { PedidoModel } from "./Pedido.model";

export class FilaPedidoModel extends Model {}

FilaPedidoModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,  
    primaryKey: true
  },
  PedidoModelId: {
    type: DataTypes.INTEGER,
    unique: true
  }
}, { tableName: "filaPedidos", sequelize });

PedidoModel.hasOne(FilaPedidoModel);
FilaPedidoModel.belongsTo(PedidoModel);