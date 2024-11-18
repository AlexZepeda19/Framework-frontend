import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom"; // Importamos useNavigate

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
  });
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate(); // Usamos useNavigate para la redirección

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/v1/usuario", {
        ...formData,
        fechaRegistro: new Date().toISOString(),
        rol: { id_rol: 2 }, // Valor de rol predeterminado
      });
      setMensaje(`Usuario registrado: ${response.data.nombre}`);

      // Eliminar mensaje después de 3 segundos (opcional)
      setTimeout(() => {
        setMensaje("");
      }, 3000);

      navigate("/Login");

    } catch (error) {
      setMensaje(`Error al registrar usuario: ${error.response?.data?.message || error.message}`);
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center">Registro de Usuario</h2>
          <form onSubmit={handleSubmit} className="border p-4 rounded">
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo electrónico</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Registrar</button>
          </form>
          {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
        </div>
      </div>
    </div>
  );
};

export default Registro;
