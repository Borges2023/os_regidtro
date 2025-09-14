import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, setAuthToken } from "../api";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/admin/login", { email, senha });
      setAuthToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      navigate("/admin/dashboard");
    } catch {
      alert("Email ou senha inválidos");
    }
  };

  return (
    <div className="container">
      <h2>Login Administrador</h2>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Senha"
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default AdminLogin;
