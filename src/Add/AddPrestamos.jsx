import React, { useState } from 'react';
import axios from 'axios';

const AddPrestamos = () => {
  // Estados para manejar los valores del formulario
  const [idUsuario, setIdUsuario] = useState(1);  // Valor predeterminado de id_usuario
  const [idLibro, setIdLibro] = useState(1);      // Valor predeterminado de id_libro
  const [fechaPrestamo, setFechaPrestamo] = useState('');
  const [fechaDevolucion, setFechaDevolucion] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Crear el objeto JSON para enviar al backend
    const prestamo = {
      usuario: {
        id_usuario: idUsuario,
      },
      libro: {
        id_libro: idLibro,
      },
      fechaPrestamo: fechaPrestamo,
      fechaDevolucion: fechaDevolucion,
    };

    try {
      // Enviar el JSON al backend utilizando Axios
      const response = await axios.post('http://localhost:8080/api/v1/prestamos', prestamo);
      console.log('Préstamo agregado:', response.data);
    } catch (error) {
      console.error('Error al agregar el préstamo:', error);
    }
  };

  return (
    <div>
      <h1>Agregar Préstamo</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID Usuario:</label>
          <input
            type="number"
            value={idUsuario}
            onChange={(e) => setIdUsuario(e.target.value)}
            required
          />
        </div>
        <div>
          <label>ID Libro:</label>
          <input
            type="number"
            value={idLibro}
            onChange={(e) => setIdLibro(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Fecha de Préstamo:</label>
          <input
            type="datetime-local"
            value={fechaPrestamo}
            onChange={(e) => setFechaPrestamo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Fecha de Devolución:</label>
          <input
            type="datetime-local"
            value={fechaDevolucion}
            onChange={(e) => setFechaDevolucion(e.target.value)}
            required
          />
        </div>
        <button type="submit">Agregar Préstamo</button>
      </form>
    </div>
  );
};

export default AddPrestamos;
