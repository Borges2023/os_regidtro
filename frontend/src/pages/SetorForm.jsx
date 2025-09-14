import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api";

function SetorForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome_guerra: "",
    saram: "",
    email: "",
    titulo: "",
    descricao: "",
    arquivo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in form) data.append(key, form[key]);
    data.append("setor_id", id);
    try {
      await api.post("/ordens", data);
      alert("OS enviada com sucesso!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar OS");
    }
  };

  return (
    <div className="container">
      <h2>Formulário de OS</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nome de Guerra"
          name="nome_guerra"
          value={form.nome_guerra}
          onChange={handleChange}
          required
        />
        <input
          placeholder="SARAM"
          name="saram"
          value={form.saram}
          onChange={handleChange}
          required
        />
        <input
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          placeholder="Título"
          name="titulo"
          value={form.titulo}
          onChange={handleChange}
          required
        />
        <textarea
          placeholder="Descrição"
          name="descricao"
          value={form.descricao}
          onChange={handleChange}
          required
        />
        <input type="file" name="arquivo" onChange={handleChange} />
        <button type="submit">Enviar OS</button>
      </form>
      <button onClick={() => navigate("/")}>Voltar à página inicial</button>
    </div>
  );
}

export default SetorForm;
