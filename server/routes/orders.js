const router = require("express").Router();
const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
const Cart = require("../models/Cart");
const auth = require("../middlewares/authMiddleware");
const sequelize = require("../database/config");

router.post("/", auth, async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const cartItems = await Cart.findAll({
      where: { userId: req.userId },
      include: [{ model: Product }],
    });

    if (cartItems.length === 0) {
      return res.status(400).json({ error: "Carrinho vazio" });
    }

    const total = cartItems.reduce((sum, item) => {
      return sum + item.Product.price * item.quantity;
    }, 0);

    const order = await Order.create(
      {
        userId: req.userId,
        total,
      },
      { transaction: t }
    );

    await Promise.all(
      cartItems.map((item) => {
        return OrderItem.create(
          {
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.Product.price,
          },
          { transaction: t }
        );
      })
    );

    await Cart.destroy({
      where: { userId: req.userId },
      transaction: t,
    });

    await t.commit();
    res.status(201).json(order);
  } catch (error) {
    await t.rollback();
    res.status(500).json({ error: "Erro ao criar pedido" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.userId },
      include: [
        {
          model: OrderItem,
          include: [{ model: Product }],
        },
      ],
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar pedidos" });
  }
});

module.exports = router;
