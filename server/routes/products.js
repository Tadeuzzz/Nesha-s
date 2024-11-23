const router = require("express").Router();
const Product = require("../models/Product");
const auth = require("../middlewares/authMiddleware");

router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar produto" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produto" });
  }
});

module.exports = router;
