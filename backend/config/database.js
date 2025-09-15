require("dotenv").config();
const { Sequelize } = require("sequelize");

// decodifica CA se existir
const aivenCa = process.env.AIVEN_CA_B64
  ? Buffer.from(process.env.AIVEN_CA_B64, "base64").toString()
  : undefined;

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
    define: { timestamps: false },
    dialectOptions: aivenCa ? { ssl: { ca: aivenCa } } : {},
  }
);
// testar conexão
sequelize
  .authenticate()
  .then(() => console.log("DB conectada"))
  .catch((err) => console.error("Erro DB:", err));
module.exports = sequelize;
