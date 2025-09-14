import React, { useState } from "react";
import { api } from "../api";

function Consulta() {
  const [nome, setNome] = useState("");
  const [saram, setSaram] = useState("");
  const [osList, setOsList] = useState([]);

  const handleConsulta = async () => {
    try {
      const res = await api.get("/ordens/consulta", {
        params: { nome_guerra: nome, saram },
      });
      setOsList(res.data);
    } catch (err) {
      console.error(err);
      alert("Erro ao consultar");
    }
  };

  return (
    <div className="container">
      <h2>Consulta de OS</h2>
      <input
        placeholder="Nome de Guerra"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        placeholder="SARAM"
        value={saram}
        onChange={(e) => setSaram(e.target.value)}
      />
      <button onClick={handleConsulta}>Consultar</button>
      <hr />
      <ul>
        {osList.map((os) => (
          <li key={os.id}>
            [{os.status}] {os.titulo} - {os.setor?.nome}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Consulta;
