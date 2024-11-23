import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Rotas from "./Rotas";
import {AuthProvider} from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Rotas />
    </AuthProvider>
  </React.StrictMode>
);
