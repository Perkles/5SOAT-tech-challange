import { BelongsToManyAddAssociationsMixin, DataTypes, Model } from "sequelize";
import { ImagemModel } from "./Imagem.model";
import sequelize from "../config/Database.config";

export class ProdutoModel extends Model {
    declare id: number;
    declare addImagemModel: BelongsToManyAddAssociationsMixin<ImagemModel, ProdutoModel['id']>;
}

ProdutoModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.TEXT
    },
    descricao: {
        type: DataTypes.TEXT
    },
    categoria: {
        type: DataTypes.TEXT
    },
    preco: {
        type: DataTypes.DOUBLE
    },
    tempoDePreparo: {
        type: DataTypes.DOUBLE
    }
}, { tableName: "produtos", sequelize });

ProdutoModel.belongsToMany(ImagemModel, { through: 'ImagensDoProduto' });
ImagemModel.belongsToMany(ProdutoModel, { through: 'ImagensDoProduto' });
