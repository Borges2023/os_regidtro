import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const [ordens, setOrdens] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }

    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/ordens/admin", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setOrdens(res.data);
        })
        .catch((err) => {
          console.error("Erro ao buscar OS:", err);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate("/");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Painel do Administrador</h1>

      {admin ? (
        <p className="mb-4">
          Bem-vindo, <strong>{admin.email}</strong>!
        </p>
      ) : (
        <p>Carregando informações do administrador...</p>
      )}

      <div className="mb-4">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
        >
          Página Inicial
        </button>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Logout
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-3">Ordens de Serviço</h2>

      {ordens.length > 0 ? (
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-3 py-2">ID</th>
              <th className="border px-3 py-2">Solicitante</th>
              <th className="border px-3 py-2">Setor</th>
              <th className="border px-3 py-2">Título</th>
              <th className="border px-3 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {ordens.map((os) => (
              <tr key={os.id}>
                <td className="border px-3 py-2">{os.id}</td>
                <td className="border px-3 py-2">
                  {os.solicitante?.nome_guerra}
                </td>
                <td className="border px-3 py-2">{os.setor?.nome}</td>
                <td className="border px-3 py-2">{os.titulo}</td>
                <td className="border px-3 py-2">{os.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhuma OS encontrada.</p>
      )}
    </div>
  );
};

export default AdminDashboard;
