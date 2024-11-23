import React from "react";
import { Link } from "react-router-dom";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Painel de Controle</h1>
        <p>Gerencie o e-commerce</p>
      </header>

      <section className={styles.cards}>
        <div className={styles.card}>
          <h2>Produtos</h2>
          <p>Total: 5</p>
          <button className={styles.button}>
            <Link to="/produtos">Gerenciar Produto</Link>s
          </button>
        </div>
        <div className={styles.card}>
          <h2>Pedidos</h2>
          <p>Hoje: 5</p>
          <button className={styles.button}>Ver Pedidos</button>
        </div>
        <div className={styles.card}>
          <h2>Usuários</h2>
          <p>Total: 2</p>
          <button className={styles.button}>Ver Usuários</button>
        </div>
      </section>

      <section className={styles.recentActivity}>
        <h2>Atividades Recentes</h2>
        <ul className={styles.activityList}>
          <li>Pedido #1029 concluído por João Silva.</li>
          <li>Produto "Tênis Nike" adicionado ao catálogo.</li>
          <li>Ana Clara se registrou na plataforma.</li>
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
