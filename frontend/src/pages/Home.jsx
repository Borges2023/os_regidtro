import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

function Home() {
  const [setores, setSetores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/setores").then((res) => setSetores(res.data));
  }, []);

  return (
    <div className="container">
      <h1>Sistema de Registro de OS</h1>
      <h2>Primeiro Escolha o setor</h2>
      <ul>
        {setores.map((s) => (
          <li key={s.id}>
            <button onClick={() => navigate(`/setor/${s.id}`)}>{s.nome}</button>
          </li>
        ))}
      </ul>
      <hr />
      <button onClick={() => navigate("/consulta")}>Consultar minhas OS</button>
      <hr />
      <button onClick={() => navigate("/admin/login")}>
        Login Administrador
      </button>
    </div>
  );
}

export default Home;
