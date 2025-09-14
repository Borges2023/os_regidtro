const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Solicitante = sequelize.define(
  "Solicitante",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome_guerra: DataTypes.STRING,
    saram: DataTypes.STRING,
    email: DataTypes.STRING,
  },
  { tableName: "solicitantes", timestamps: false }
);

module.exports = Solicitante;
