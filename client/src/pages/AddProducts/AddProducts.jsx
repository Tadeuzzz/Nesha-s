import React, { useState } from "react";
import axios from "../../services/api";
import styles from "./AddProduct.module.css";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: null, // Novo campo para a imagem
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Criar FormData para envio de arquivo
    const productData = new FormData();
    productData.append("name", formData.name);
    productData.append("description", formData.description);
    productData.append("price", formData.price);
    productData.append("stock", formData.stock);
    if (formData.image) {
      productData.append("image", formData.image);
    }

    try {
      const response = await axios.post("/products", productData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccessMessage("Produto adicionado com sucesso!");
      setErrorMessage("");
      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        image: null, // Limpar imagem após submissão
      });
    } catch (error) {
      setErrorMessage("Erro ao adicionar o produto. Tente novamente.");
      setSuccessMessage("");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Adicionar Produto</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Descrição:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Preço:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            required
          />
        </label>
        <label>
          Estoque:
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Imagem:
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>
        <button type="submit">Adicionar Produto</button>
      </form>
      {successMessage && <p className={styles.success}>{successMessage}</p>}
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
    </div>
  );
}
