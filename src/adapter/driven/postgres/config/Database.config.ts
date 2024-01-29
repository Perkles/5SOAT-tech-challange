import 'dotenv/config'
import { Sequelize } from "sequelize";

const nomeBanco = process.env.DB_NAME; 
const usuarioBanco = process.env.DB_USER;
const hostBanco = process.env.DB_HOST;
const senhaBanco = process.env.DB_PASSWORD;

const sequelize  = new Sequelize(nomeBanco!, usuarioBanco!, senhaBanco, {
    dialect: "postgres",
    host: hostBanco,
});

export default sequelize