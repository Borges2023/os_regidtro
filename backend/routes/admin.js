const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  const { email, senha } = req.body;
  try {
    const admin = await Admin.findOne({ where: { email } });
    if (!admin)
      return res.status(401).json({ error: "Email ou senha inválidos" });
    const ok = await bcrypt.compare(senha, admin.senha);
    if (!ok) return res.status(401).json({ error: "Email ou senha inválidos" });

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Erro no servidor" });
  }
});

module.exports = router;
