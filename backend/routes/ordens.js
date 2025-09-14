const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const OrdemServico = require("../models/OrdemServico");
const Setor = require("../models/Setor");
const Solicitante = require("../models/Solicitante");
const auth = require("../middleware/auth");

const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) =>
    cb(
      null,
      Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        path.extname(file.originalname)
    ),
});
const upload = multer({ storage });

router.post("/", upload.single("arquivo"), async (req, res) => {
  try {
    const { nome_guerra, saram, email, titulo, descricao, setor_id } = req.body;
    if (!nome_guerra || !saram || !email || !titulo || !descricao || !setor_id)
      return res.status(400).json({ error: "Campos obrigatórios ausentes" });

    let solicitante = await Solicitante.findOne({ where: { saram } });
    if (!solicitante) {
      solicitante = await Solicitante.create({ nome_guerra, saram, email });
    } else {
      if (
        solicitante.nome_guerra !== nome_guerra ||
        solicitante.email !== email
      ) {
        await solicitante.update({ nome_guerra, email });
      }
    }

    const arquivo = req.file ? req.file.filename : null;

    const os = await OrdemServico.create({
      titulo,
      descricao,
      arquivo,
      setor_id: Number(setor_id),
      solicitante_id: solicitante.id,
      status: "Aberta",
    });

    res.json(os);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Consulta do usuário
router.get("/consulta", async (req, res) => {
  const { nome_guerra, saram } = req.query;
  try {
    if (!nome_guerra || !saram) return res.json([]);
    const solicitante = await Solicitante.findOne({
      where: { nome_guerra, saram },
    });
    if (!solicitante) return res.json([]);
    const os = await OrdemServico.findAll({
      where: { solicitante_id: solicitante.id },
      include: [Setor],
      order: [["id", "DESC"]],
    });
    res.json(os);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: listagem de OS
router.get("/admin", auth, async (req, res) => {
  try {
    const { status, setor_id } = req.query;
    const where = {};
    if (status) where.status = status;
    if (setor_id) where.setor_id = Number(setor_id);
    const os = await OrdemServico.findAll({
      where,
      include: [Setor, Solicitante],
      order: [["id", "DESC"]],
    });
    res.json(os);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: atualizar OS
router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, titulo, descricao, setor_id } = req.body;
    const os = await OrdemServico.findByPk(id);
    if (!os) return res.status(404).json({ error: "OS não encontrada" });
    await os.update({
      status: status || os.status,
      titulo: titulo || os.titulo,
      descricao: descricao || os.descricao,
      setor_id: setor_id || os.setor_id,
    });
    res.json(os);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: deletar OS
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const os = await OrdemServico.findByPk(id);
    if (!os) return res.status(404).json({ error: "OS não encontrada" });
    await os.destroy();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
