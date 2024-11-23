import React, { useEffect, useState } from "react";
import styles from "./Products.module.css";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/products.json")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Erro ao carregar produtos:", error));
  }, []);

  return (
    <div className={styles.productsContainer}>
      <h1>Produtos</h1>
      <div className={styles.productCards}>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className={styles.card}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className={styles.price}>R${product.price.toFixed(2)}</p>
              <button className={styles.button}>Adicionar ao Carrinho</button>
            </div>
          ))
        ) : (
          <p>Carregando produtos...</p>
        )}
      </div>
    </div>
  );
};

export default Products;
