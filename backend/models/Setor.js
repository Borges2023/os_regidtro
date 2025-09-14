const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Setor = sequelize.define(
  "Setor",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: DataTypes.STRING,
  },
  { tableName: "setores", timestamps: false }
);

module.exports = Setor;
