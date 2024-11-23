import React from "react";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Bem-vindo ao E-commerce Top</h1>
        <p>
          Descubra os melhores produtos com preços incríveis. Aqui você encontra
          qualidade, praticidade e segurança em um só lugar. Navegue e
          aproveite!
        </p>
      </header>

      <section className={styles.features}>
        <h2>Por que escolher nosso e-commerce?</h2>
        <div className={styles.featureList}>
          <div className={styles.featureItem}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/870/870071.png"
              alt="Entrega Rápida"
              className={styles.featureIcon}
            />
            <h3>Entrega Rápida</h3>
            <p>
              Receba seus produtos no conforto da sua casa em tempo recorde!
            </p>
          </div>
          <div className={styles.featureItem}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/4883/4883722.png"
              alt="Pagamento Seguro"
              className={styles.featureIcon}
            />
            <h3>Pagamento Seguro</h3>
            <p>
              Compre com total segurança usando os métodos de pagamento
              confiáveis.
            </p>
          </div>
          <div className={styles.featureItem}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUrD7IvgegPwPk14wfmHBwHuNMgngM3P-s1Q&s"
              alt="Suporte ao Cliente"
              className={styles.featureIcon}
            />
            <h3>Suporte ao Cliente</h3>
            <p>
              Conte com um atendimento dedicado para te ajudar em cada etapa.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
