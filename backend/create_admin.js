require("dotenv").config();
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");

async function run() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });

  const email = "tpowerinformatica.2016@gmail.com";
  const senhaPlain = "Vidaloka2019/";
  const hash = await bcrypt.hash(senhaPlain, 10);

  await conn.execute("DELETE FROM admins WHERE email = ?", [email]);
  await conn.execute(
    "INSERT INTO admins (nome, email, senha) VALUES (?, ?, ?)",
    ["Administrador", email, hash]
  );

  console.log("Admin criado/atualizado:", email);
  await conn.end();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
