const router = require("express").Router();
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const auth = require("../middlewares/authMiddleware");

router.get("/", auth, async (req, res) => {
  try {
    const cartItems = await Cart.findAll({
      where: { userId: req.userId },
      include: [{ model: Product }],
    });
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar carrinho" });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cartItem = await Cart.create({
      userId: req.userId,
      productId,
      quantity,
    });
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar item ao carrinho" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await Cart.destroy({
      where: {
        id: req.params.id,
        userId: req.userId,
      },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao remover item do carrinho" });
  }
});

module.exports = router;
