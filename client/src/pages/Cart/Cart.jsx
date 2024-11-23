import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Cart.module.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("/cart.json");
        setCartItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar o carrinho:", error);
        setLoading(false);
      }
    };
    fetchCartItems();
  }, []);

  const calculateTotal = () => {
    return cartItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  if (loading) {
    return <p className={styles.loading}>Carregando carrinho...</p>;
  }

  return (
    <div className={styles.container}>
      <h2>Meu Carrinho</h2>
      {cartItems.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <ul className={styles.cartList}>
            {cartItems.map((item) => (
              <li key={item.id} className={styles.cartItem}>
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.productImage}
                />
                <div>
                  <h3>{item.name}</h3>
                  <p>Preço: R$ {item.price.toFixed(2)}</p>
                  <p>Quantidade: {item.quantity}</p>
                </div>
                <button
                  className={styles.removeButton}
                  onClick={() => removeItem(item.id)}
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
          <div className={styles.total}>
            <h3>Total: R$ {calculateTotal()}</h3>
            <button className={styles.checkoutButton}>Finalizar Compra</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
