import { DataTypes, Model } from "sequelize";
import sequelize from "../config/Database.config";
import { PedidoModel } from "./Pedido.model";

export class ClienteModel extends Model {
    declare id: number
}

ClienteModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cpf: {
        type: DataTypes.TEXT,
        allowNull: true  
    },
    nome: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, { tableName: "clientes", sequelize });

ClienteModel.hasMany(PedidoModel)
PedidoModel.belongsTo(ClienteModel)