import React, { useState } from 'react';
import axios from 'axios';

const AddUsuarios = () => {
  // State para el formulario
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fechaRegistro, setFechaRegistro] = useState('');
  const [rol, setRol] = useState(1);  // Valor predeterminado para el rol (ejemplo: id_rol = 1)

  // Función para manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Crear el objeto JSON a enviar
    const user = {
      nombre: nombre,
      email: email,
      password: password,
      fechaRegistro: fechaRegistro,
      rol: {
        id_rol: rol,
      },
    };

    try {
      // Enviar los datos al backend usando Axios
      const response = await axios.post('http://localhost:8080/api/v1/usuario', user);
      console.log('Usuario agregado:', response.data);
    } catch (error) {
      console.error('Hubo un error al agregar el usuario:', error);
    }
  };

  return (
    <div>
      <h1>Agregar Usuario</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Fecha de Registro:</label>
          <input
            type="datetime-local"
            value={fechaRegistro}
            onChange={(e) => setFechaRegistro(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Rol:</label>
          <select value={rol} onChange={(e) => setRol(e.target.value)} required>
            <option value="1">Admin</option>
            <option value="2">Usuario</option>
          </select>
        </div>
        <button type="submit">Agregar Usuario</button>
      </form>
    </div>
  );
};

export default AddUsuarios;
