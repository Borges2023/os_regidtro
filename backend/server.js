const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const sequelize = require("./config/database");
const adminRoutes = require("./routes/adminRoutes");
const ordensRoutes = require("./routes/ordens");
const setoresRoutes = require("./routes/setores");
const ordemRoutes = require("./routes/ordemRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/admin", adminRoutes);
app.use("/ordens", ordensRoutes);
app.use("/setores", setoresRoutes);

sequelize
  .authenticate()
  .then(() => console.log("Conexão com DB bem-sucedida"))
  .catch((err) => console.error("Erro de conexão:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
