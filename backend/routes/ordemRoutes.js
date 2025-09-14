const express = require("express");
const router = express.Router();

const OrdemServico = require("../models/OrdemServico");
const Solicitante = require("../models/Solicitante");
const Setor = require("../models/Setor");
router.get("/teste", (req, res) => {
  res.json({ ok: true, rota: "ordens/teste" });
});

// 🔹 Listar todas as Ordens de Serviço
router.get("/", async (req, res) => {
  try {
    const ordens = await OrdemServico.findAll({
      include: [
        {
          model: Solicitante,
          as: "solicitante",
          attributes: ["id", "nome_guerra", "saram"],
        },
        { model: Setor, as: "setor", attributes: ["id", "nome"] },
      ],
      order: [["id", "DESC"]],
    });

    if (!ordens || ordens.length === 0) {
      return res.status(404).json({ message: "Nenhuma OS encontrada" });
    }

    res.json(ordens);
  } catch (err) {
    console.error("Erro ao buscar ordens:", err);
    res.status(500).json({ error: "Erro ao buscar ordens de serviço" });
  }
});

module.exports = router;
