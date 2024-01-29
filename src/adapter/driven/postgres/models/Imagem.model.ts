import { DataTypes, Model } from "sequelize";
import sequelize from "../config/Database.config";

export class ImagemModel extends Model {}

ImagemModel.init({
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
    url: {
        type: DataTypes.TEXT
    }
}, { tableName: "imagens", sequelize });
