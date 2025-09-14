const express = require("express");
const router = express.Router();
const Setor = require("../models/Setor");

router.get("/", async (_req, res) => {
  try {
    const setores = await Setor.findAll({ order: [["id", "ASC"]] });
    res.json(setores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
