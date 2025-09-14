const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Setor = require("./Setor");
const Solicitante = require("./Solicitante");

const OrdemServico = sequelize.define(
  "OrdemServico",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    titulo: DataTypes.STRING,
    descricao: DataTypes.TEXT,
    arquivo: DataTypes.STRING,
    status: DataTypes.STRING,
    setor_id: DataTypes.INTEGER,
    solicitante_id: DataTypes.INTEGER,
  },
  { tableName: "ordens_servico", timestamps: false }
);

OrdemServico.belongsTo(Setor, { foreignKey: "setor_id" });
OrdemServico.belongsTo(Solicitante, { foreignKey: "solicitante_id" });

module.exports = OrdemServico;
