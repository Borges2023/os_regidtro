import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SetorForm from "./pages/SetorForm";
import Consulta from "./pages/Consulta";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/setor/:id" element={<SetorForm />} />
      <Route path="/consulta" element={<Consulta />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;
