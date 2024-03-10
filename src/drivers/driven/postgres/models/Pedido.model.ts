import { BelongsToManyAddAssociationsMixin, BelongsToManyGetAssociationsMixin, BelongsToSetAssociationMixin, DataTypes, Model } from "sequelize";
import sequelize from "../config/Database.config";
import { ProdutoModel } from "./Produto.model";
import { ClienteModel } from "./Cliente.model";
    
export class PedidoModel extends Model {
    declare id: number;
    declare addProdutoModels: BelongsToManyAddAssociationsMixin<ProdutoModel, ProdutoModel['id'] >
}

PedidoModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    status: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    valorTotal: {
        type: DataTypes.DOUBLE,
        allowNull: true
    }
}, { tableName: "pedidos", sequelize });

PedidoModel.belongsToMany(ProdutoModel, {through: "ProdutosDoPedido"});
ProdutoModel.belongsToMany(PedidoModel, { through: 'ProdutosDoPedido' });
