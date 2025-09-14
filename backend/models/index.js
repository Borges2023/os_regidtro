const OrdemServico = require("./OrdemServico");
const Solicitante = require("./Solicitante");
const Setor = require("./Setor");

// Relações
OrdemServico.belongsTo(Solicitante, {
  foreignKey: "solicitanteId",
  as: "solicitante",
});
OrdemServico.belongsTo(Setor, { foreignKey: "setorId", as: "setor" });

module.exports = { OrdemServico, Solicitante, Setor };
